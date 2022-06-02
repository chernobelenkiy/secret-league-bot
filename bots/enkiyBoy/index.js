const { Telegraf, Markup } = require('telegraf');

//https://github.com/telegraf/telegraf/tree/v4/docs/examples

const bot = new Telegraf(process.env.ENKIY);

const aboutMe = `
Привет! Меня зовут Бунин Иван, я проживаю в Питере и являюсь ведущим фронтенд разработчиком в американском стартапе. Параллельно с этим с коллегой мы ведем бесплатную онлайн-школу.

По моему личному мнению у нас есть 5 самых ценных ресурсов: социальные связи, здоровье, навыки, время и идеи, поэтому буду рад любому нетворкингу или сотрудничеству. 

Также я люблю воплощать идеи в жизнь. Вот, например, несколько моих реализованных проектов (некоторые уже неактивны):

1. Полиграфическая мастерская “Иван Печатник”
2. Служба доставки еды “Eat me”
3. Череповецкий IT-чат, который планировался как перекресток между компаниями
4. Secret League - бесплатная телеграм-школа по фронтенд-разработке
5. National Horny Day Contest - состязание откровенных фото в инстаграмме

К сожалению, на текущий момент ни один из них не приносит прибыли, так как их нужно дорабатывать, но тем не менее я планирую взять в работу еще несколько: IT-консалтинг и небольшой стартап. 

Поэтому, если вам интересно сотрудничать, то не стесняйтесь - пишите. Может у нас с вами получится что-то действительно крутое.
`

const menu =  {
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([
    [
      Markup.button.callback('Обо мне', 'about_me'),
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

bot.start((ctx) => ctx.reply('Привет, человек! Добро пожаловать на развилку.', menu));
// bot.command('start', (ctx) =>  ctx.reply('Добро пожаловать на развилку.', menu));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));