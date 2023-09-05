import TelegramBot from 'node-telegram-bot-api';
import { PromptManager } from '../controllers/prompt';
import { createChatSettings } from '../helpers';
import { PsychoCommandsManager } from './controllers/commands';
import { PsychoSystemPromptManager } from './controllers/systemPrompt';
import { createUserAccess } from './helpers/userAccess';

if (!process.env.PSYCHO) {
  throw new Error('Telegram API key is needed');
}

const bot = new TelegramBot(process.env.PSYCHO, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;
  
  const chatSettings = createChatSettings(msg);
  const cmdManager = new PsychoCommandsManager(chatSettings);
  const userAccess = createUserAccess(msg, cmdManager.canCommand() || cmdManager.isCommand(msg.text));
  
  console.group();
  console.log('message: ', msg.text);
  console.log('userAccess: ', userAccess);
  console.log('userId: ', msg.from?.id);
  console.groupEnd();
  
  if (userAccess.canReply) {
    const systemPrompt = new PsychoSystemPromptManager(chatSettings)
    const response = await new PromptManager(systemPrompt, chatSettings, msg.text).generate();
    if (!response) return;

    await bot.sendMessage(
      msg.chat.id,
      response,
      { reply_to_message_id: msg.message_id, parse_mode: 'HTML' }
    );
  } else if (cmdManager.canCommand()) {
    // cmdManager.command();
  }
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Выбери из меню', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Prompt', callback_data: 'prompt' },
          { text: 'Reset', callback_data: 'reset' },
        ],
      ],
    },
  });
});

// Listen for button clicks
bot.on('callback_query', (query) => {
  // new PsychoCommandsManager(query.message).command(query.data);
});