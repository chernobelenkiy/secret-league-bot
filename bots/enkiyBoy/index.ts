import TelegramBot from 'node-telegram-bot-api';
import { generate } from '../generate';

if (!process.env.ENKIY) {
  throw new Error('Telegram API key is needed');
}

const bot = new TelegramBot(process.env.ENKIY, { polling: true });

bot.on('message', async (msg) => {
  const message = msg.text;
  const chatId = msg.chat.id;
  const chatType = msg.chat.type;
  const replyToMessageId = msg.message_id;
  const userId = msg?.from?.id?.toString();
  
  if (!message) return;
  const botInfo = await bot.getMe();

  const isChannel = userId === process.env.ADMIN_CHANNEL_ID;
  const isAdmin = userId === process.env.ADMIN_ID ||
    userId === process.env.ADMIN_CHAT_ID ||
    isChannel;

  const canReply = (msg.reply_to_message?.from?.id === botInfo.id || isChannel) &&
    (chatType === 'channel' || chatType === 'supergroup');

  console.group();
  console.log('message: ', message);
  console.log('isAdmin: ', isAdmin);
  console.log('userId: ', userId);
  console.log('chatType: ', chatType);
  console.groupEnd();

  if (canReply) {
    const response = await generate(message, isAdmin, isChannel);
    if (!response) return;
    await bot.sendMessage(chatId, response, { reply_to_message_id: replyToMessageId, parse_mode: 'HTML' });
  }
});