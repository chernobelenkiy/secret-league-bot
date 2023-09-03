import TelegramBot from 'node-telegram-bot-api';
import { PromptManager } from '../prompt';
import { storageManager } from '../storage';
import { createUserAccess } from './userAccess';
import { SystemPrompt } from './systemPrompt';

if (!process.env.PSYCHO) {
  throw new Error('Telegram API key is needed');
}

const bot = new TelegramBot(process.env.PSYCHO, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;
  const botInfo = await bot.getMe();
  const userAccess = createUserAccess(msg, botInfo);
  
  console.group();
  console.log('message: ', msg.text);
  console.log('userAccess: ', userAccess);
  console.log('userId: ', msg.from?.id);
  
  if (userAccess.canReply) {
    storageManager.add(msg.chat.id, msg.from?.id, userAccess.message, 'user');
    const messages = storageManager.get(msg.chat.id, msg.from?.id);
    const systemPrompt = new SystemPrompt(userAccess);
    const response = await new PromptManager(systemPrompt, messages).generate();
    if (!response) return;
    console.log('response: ', response);
    console.groupEnd();
    storageManager.add(msg.chat.id, msg.from?.id, response, 'assistant');
    await bot.sendMessage(msg.chat.id, response, { reply_to_message_id: msg.message_id, parse_mode: 'HTML' });
  }
});