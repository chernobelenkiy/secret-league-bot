import TelegramBot from 'node-telegram-bot-api';
import { generate } from '../generate';

if (!process.env.ENKIY) {
  throw new Error('Telegram API key is needed');
}

const bot = new TelegramBot(process.env.ENKIY, { polling: true });

bot.on('message', async (msg) => {
  const message = msg.text;
  const chatId = msg.chat.id;
  if (!message) return;

  console.log('message: ', message);

  // Call OpenAI API to generate a response
  const response = await generate(message);
  if (!response) return;
  console.log('response: ', response);

  // Post the response as a comment to the message
  await bot.sendMessage(chatId, response);

  // Listen for replies to the comment
  // bot.on('message', async (msg) => {
  //   const reply = msg.text;
  //   if (!reply) return;

  //   // Call OpenAI API to generate a response to the reply
  //   const response = await generate(reply, 'пользователь');
  //   if (!response) return;

  //   // Post the response as a comment to the reply
  //   await bot.sendMessage(chatId, response, {
  //     reply_to_message_id: msg.message_id,
  //   });
  // });
});