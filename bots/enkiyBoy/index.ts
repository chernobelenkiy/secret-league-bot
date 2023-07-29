const { Telegraf } = require('telegraf');
const generate = require('../generate');

//https://github.com/telegraf/telegraf/tree/v4/docs/examples

const bot = new Telegraf(process.env.ENKIY);

bot.on('message', async (ctx) => {
  const message = ctx.message.text;
  const chatId = ctx.message.chat.id;

  // Call OpenAI API to generate a response
  const response = await generate(message);

  // Post the response as a comment to the message
  await ctx.telegram.sendMessage(chatId, response.choices[0].text);

  // Listen for replies to the comment
  bot.on('message', async (ctx) => {
    const reply = ctx.message.text;

    // Call OpenAI API to generate a response to the reply
    const response = await generate(reply);

    // Post the response as a comment to the reply
    await ctx.telegram.sendMessage(chatId, response.choices[0].text, {
      reply_to_message_id: ctx.message.message_id,
    });
  });
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));