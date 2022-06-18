const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BELAY_MAMBA);

const menu =  {
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([
    [
      Markup.button.url('Telegram: Записаться на консультацию', 'https://t.me/LubaProhorova'),
    ],
    [
      Markup.button.url('Instagram: Запись в direct', 'https://www.instagram.com/belaymamba_it/'),
    ],
    [
      Markup.button.url(
        'Информация, которая поможет подготовиться к консультации',
        'https://warp-psychology-913.notion.site/ae210ec0cd7e4d30be3c162a0eee312d'
      ),
    ]
  ])
};

bot.action('about_me', (ctx, next) => {
  return ctx.reply(aboutMe).then(() => next());
});

bot.start((ctx) => {
  ctx.reply(`<b>В какой области‌ я могу оказать вам помощь?</b>
    * Как предотвратить выгорание на работе?
    * Как правильно составить резюме , чтобы повысить свои шансы на желаемую должность?
    * Релокация?
    * Переход в новый вид деятельности?
    * Стратегическое планирование карьерного пути?
    
Ответы на эти и другие вопросы, связанные с карьерой человека , мы разбираем на моих консультациях.
‌
  <b>Стоимость консультации — 3000₽</b>
  ‌*длительность — 1,5 часа 
  `, menu)
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));