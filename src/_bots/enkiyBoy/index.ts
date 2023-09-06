import TelegramBot from 'node-telegram-bot-api';
import { PromptManager } from '../../controllers/prompt';
import { createChatSettings } from '../../helpers';
import { EnkiySystemPrompt } from './controllers/systemPrompt';
import { createUserAccess } from './helpers';

if (!process.env.ENKIY) {
  throw new Error('Telegram API key is needed');
}

const bot = new TelegramBot(process.env.ENKIY, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;
  const botInfo = await bot.getMe();
  const userAccess = createUserAccess(msg, botInfo);
  const chatSettings = createChatSettings(msg);
  
  console.group();
  console.log('message: ', msg.text);
  console.log('userAccess: ', userAccess);
  console.log('userId: ', msg.from?.id);
  console.groupEnd();
  
  if (userAccess.canReply || userAccess.canReplyToUser) {
    const systemPrompt = new EnkiySystemPrompt(chatSettings, userAccess);
    const response = await new PromptManager(systemPrompt, chatSettings, msg.text).generate();
    if (!response) return;
    await bot.sendMessage(msg.chat.id, response, { reply_to_message_id: msg.message_id, parse_mode: 'HTML' });
  }
});