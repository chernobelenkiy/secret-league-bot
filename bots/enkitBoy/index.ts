import TelegramBot, { InlineKeyboardButton } from 'node-telegram-bot-api';

//@ts-ignore
const bot = new TelegramBot(process.env.ENKIY, {polling: true});

const STUDY_REPLY: InlineKeyboardButton[][] = [
  [{ text: 'Хочу учиться на фронтенд разработчика', url: 'https://t.me/secret_league_bot',  }]
];


bot.on('message', (msg) => {
  if (msg.entities) return;

  bot.sendMessage(msg.chat.id, 'Я тебя не понимаю кожаный ублюдок. Перефразируй.');
});

bot.onText(/\/start/, async (msg) => {

  bot.sendMessage(msg.chat.id,
    'Выбирай, что хочешь от меня:', {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: STUDY_REPLY,
      }
    });
});