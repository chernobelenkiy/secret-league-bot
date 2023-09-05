import TelegramBot from 'node-telegram-bot-api';
import { PromptManager } from '../prompt';
import { CommandsManager } from './commands';
import { createUserAccess } from './userAccess';
import { SystemPrompt } from './systemPrompt';

if (!process.env.PSYCHO) {
  throw new Error('Telegram API key is needed');
}

const cmdManager = new CommandsManager();
const bot = new TelegramBot(process.env.PSYCHO, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;
  const userAccess = createUserAccess(msg);
  
  console.group();
  console.log('message: ', msg.text);
  console.log('userAccess: ', userAccess);
  console.log('userId: ', msg.from?.id);
  console.groupEnd();
  
  if (userAccess.canReply) {
    const response = await new PromptManager(new SystemPrompt(userAccess), msg).generate();
    if (!response) return;
    await bot.sendMessage(msg.chat.id, response, { reply_to_message_id: msg.message_id, parse_mode: 'HTML' });
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
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'prompt') {
    bot.sendMessage(chatId, 'You clicked Prompt button!');
  } else if (data === 'reset') {
    bot.sendMessage(chatId, 'You clicked Reset button!');
  }
});