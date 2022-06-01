const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.ENKIY);

const menu =  {
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([
    [Markup.button.url('Мой блог', 'https://t.me/meta_ivan'),
    Markup.button.url('Фронтенд школа', 'https://t.me/secret_league')],
    [Markup.button.url('Забукать колл со мной', 'https://calendly.com/chernobelenkiy/meeting')]
  ])
}

bot.start((ctx) => ctx.reply('Привет, человек! Добро пожаловать на развилку.', menu));
bot.command('start', (ctx) =>  ctx.reply('Привет, человек! Добро пожаловать на развилку.', menu));


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))