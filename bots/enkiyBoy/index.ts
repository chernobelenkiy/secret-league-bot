import { Telegraf } from 'telegraf';
import { generate } from '../generate';

//https://github.com/telegraf/telegraf/tree/v4/docs/examples

if (!process.env.ENKIY) {
  throw new Error('Telegram API key is needed');
}

const bot = new Telegraf(process.env.ENKIY);

bot.on('message', async (ctx) => {
  //@ts-ignore
  const message = ctx.message.text;
  const chatId = ctx.message.chat.id;

  // Call OpenAI API to generate a response
  const response = await generate(message, 'админ');
  if (!response) return;

  // Post the response as a comment to the message
  await ctx.telegram.sendMessage(chatId, response);

  // Listen for replies to the comment
  bot.on('message', async (ctx) => {
    //@ts-ignore
    const reply = ctx.message.text;

    // Call OpenAI API to generate a response to the reply
    const response = await generate(reply, 'пользователь', message);
    if (!response) return;

    // Post the response as a comment to the reply
    //@ts-ignore
    await ctx.telegram.sendMessage(chatId, response.choices[0].text, {
      reply_to_message_id: ctx.message.message_id,
    });
  });
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));