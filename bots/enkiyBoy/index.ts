import TelegramBot from 'node-telegram-bot-api';
import { generate } from '../generate';

if (!process.env.ENKIY) {
  throw new Error('Telegram API key is needed');
}

const bot = new TelegramBot(process.env.ENKIY, { polling: true });

const createTechincalTags = (isAdmin: boolean, isChannel: boolean) => {
  const tags: string[] = [];
  tags.push(isAdmin ? 'admin' : 'user');
  if (isChannel) {
    tags.push('channel');
  }
  return tags;
}

bot.on('message', async (msg) => {
  const message = msg.text;
  const chatId = msg.chat.id;
  const chatType = msg.chat.type;
  const replyToMessageId = msg.message_id;
  const userId = msg?.from?.id?.toString();
  
  if (!message) return;
  const botInfo = await bot.getMe();

  const isAdminUser = userId === process.env.ADMIN_ID;
  const isAdminChannelUserId = userId === process.env.ADMIN_CHANNEL_USER_ID;
  const isAdminChat = userId === process.env.ADMIN_CHAT_ID;
  const isChannel = userId === process.env.ADMIN_CHANNEL_ID ||  isAdminChannelUserId;
  const isAdmin = isAdminUser || isAdminChat || isChannel;

  const canReply = isAdminUser ||
    ((msg.reply_to_message?.from?.id === botInfo.id || isChannel) &&
    (chatType === 'channel' || chatType === 'supergroup'));

  console.group();
  console.log('message: ', message);
  console.log('isAdmin: ', isAdmin);
  console.log('userId: ', userId);
  console.log('chatType: ', chatType);
  

  if (canReply) {
    const response = await generate(message, createTechincalTags(isAdmin, isChannel));
    if (!response) return;
    console.log('response: ', response);
    console.groupEnd();
    await bot.sendMessage(chatId, response, { reply_to_message_id: replyToMessageId, parse_mode: 'HTML' });
  }
});