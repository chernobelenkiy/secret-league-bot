import TelegramBot, { InlineKeyboardButton } from 'node-telegram-bot-api';
require('dotenv').config();

//@ts-ignore
const bot = new TelegramBot(process.env.TOKEN, {polling: true});

const PAYMENT_REPLY: InlineKeyboardButton[][] = [
  [{ text: 'Начать обучение', callback_data: 'payment', pay: true }]
];

const AFTER_PAYMENT_REPLY: InlineKeyboardButton[][] = [
  [{ text: 'Перейти в основной канал.', url: 'https://t.me/secret_league' }]
];

bot.onText(/\/start/, async (msg) => {
  bot.sendMessage(msg.chat.id,
    'Привет! Тебя приветствует бот Тайной Лиги Леди и Джентльментов.', {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: PAYMENT_REPLY,
      }
    })
});

bot.on('callback_query', (query) => {
  const chatId = query?.message?.chat.id;

  if (chatId && query.data === 'payment') {
    query?.message?.chat.id && bot.sendInvoice(
      query.message.chat.id,
      'Тайный взнос',
      'Взнос в Тайную Лигу Леди и Джентльменов. Этот взнос станет частью призового фонда по окончанию обучения.',
      'payment_received',
      process.env.PAYMENT_TOKEN || 'PAYMENT_TOKEN',
      '',
      'RUB',
      [{ label: '1000 RUB', amount: 100000}],
    );
  }
});

bot.on('message', (msg) => {
  if (msg.successful_payment) {
    bot.sendMessage(msg.chat.id, 
    'Отлично! Теперь переходи в основной канал!', 
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: AFTER_PAYMENT_REPLY
      }
    });
  }
})

