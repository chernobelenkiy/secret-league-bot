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
  if (!message) return;

  if (chatType === 'channel' || chatType === 'supergroup') {
    // Call OpenAI API to generate a response
    const response = await generate(message, chatType);
    if (!response) return;

    // Post the response as a comment to the message
    await bot.sendMessage(chatId, response, { reply_to_message_id: replyToMessageId });
  } else {
    // The message was not sent in a channel or in the comments section
    // Do nothing or handle the message differently
    bot.sendMessage(chatId, 'Что нужно тебя, кожаный мешок?');
  }
});