const { Telegraf, Markup } = require('telegraf');
const { queryData } = require('./api');

const bot = new Telegraf(process.env.IMPROVE_YOUR_CV);

const createMenu = (step) => {
  return {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback(`Да-${step.yes}`, step.payload),
        Markup.button.callback(`Нет-${step.no}`, step.payload),
      ]
    ])
  };
}

(async () => {
  const steps = await queryData();
  const start = steps[0];

  bot.start((ctx) => {
    ctx.reply(start.text, createMenu(start));
  });

  steps.slice(1, steps.length).forEach(step => {
    bot.action(step.id, (ctx) => {
      return ctx.reply(step.text, step.payload ? createMenu(step) : void 0);
    });
  });
  bot.launch();
})();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));