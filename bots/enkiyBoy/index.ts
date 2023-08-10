import TelegramBot from 'node-telegram-bot-api';
import { generate } from '../generate';
import {
  extractHashtags,
  createTechincalTags,
  createUserAccess,
} from './helpers';

if (!process.env.ENKIY) {
  throw new Error('Telegram API key is needed');
}

const bot = new TelegramBot(process.env.ENKIY, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;
  const botInfo = await bot.getMe();
  const { hashTags, parsedMessage } = extractHashtags(msg.text);
  const userAccess = createUserAccess(msg, botInfo, hashTags);
  
  console.group();
  console.log('message: ', msg.text);
  console.log('userAccess: ', userAccess);
  console.log('userId: ', msg.from?.id);
  console.log('chatType: ', msg.chat.type);
  console.log('hashTags: ', hashTags);
  
  if (userAccess.canReply || userAccess.canReplyToUser) {
    const response = await generate(parsedMessage, createTechincalTags(userAccess));
    if (!response) return;
    console.log('response: ', response);
    console.groupEnd();
    await bot.sendMessage(msg.chat.id, response, { reply_to_message_id: msg.message_id, parse_mode: 'HTML' });
  }
});