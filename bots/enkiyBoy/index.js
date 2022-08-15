const { Telegraf, Markup } = require('telegraf');

//https://github.com/telegraf/telegraf/tree/v4/docs/examples
//heroku ps:scale web=0

const bot = new Telegraf(process.env.ENKIY);

const menu =  {
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([
    [
      Markup.button.url('Связаться со мной', 'https://t.me/chernobelenkiy'),
    ],
    [
      Markup.button.url('Мой блог', 'https://t.me/meta_ivan'),
      Markup.button.url('Insta', 'https://www.instagram.com/chernobelenkiy/'),
    ],
    [
      Markup.button.url('Фронтенд школа', 'https://t.me/secret_league'),
      Markup.button.url('Забукать колл', 'https://calendly.com/chernobelenkiy/meeting')
    ]
  ])
};

bot.action('about_me', (ctx, next) => {
  return ctx.reply(aboutMe).then(() => next());
});

bot.start((ctx) => {
  ctx.forwardMessage(process.env.CHAT_ID)
  ctx.reply('Привет, человек! Добро пожаловать на развилку.', menu)
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));