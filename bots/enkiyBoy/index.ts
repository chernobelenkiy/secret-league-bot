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
  const userId = msg?.from?.id;
  console.log('userId: ', userId);
  if (!message) return;

  const response = await generate(message, chatType);
  if (!response) return;

  await bot.sendMessage(chatId, response, { reply_to_message_id: replyToMessageId });
});