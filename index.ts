require('dotenv').config();

import TelegramBot, { InlineKeyboardButton } from 'node-telegram-bot-api';

//@ts-ignore
const bot = new TelegramBot(process.env.TOKEN, {polling: true});

const PAYMENT_REPLY: InlineKeyboardButton[][] = [
  [{ text: 'Я честно оплатил взнос!', callback_data: 'payment' }]
];

bot.onText(/\/start/, async (msg) => {
  bot.sendMessage(msg.chat.id,
    'Привет! Тебя приветствует бот Тайной Лиги Леди и Джентльментов.' +
    '\n\nЧтобы начать обучение, необходимо внести взнос в нашу Лигу. Этот взнос станет частью призового фонда по окончанию обучения.' +
    '\n\nЕсли ты готов, то переводи 1000 рублей по номеру +79602985181 (Иван Б, Сбер / Тинькофф)', {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: PAYMENT_REPLY,
      }
    });
});

bot.on('callback_query', (query) => {
  const chatId = query?.message?.chat.id;

  if (chatId && query.data === 'payment') {
    bot.sendMessage(chatId, 
      `
        Отлично! Теперь переходи в основной канал!
        <a href="${process.env.INVITE_LINK}">Тайная Лига Леди и Джентльменов</a>
      `, { parse_mode: 'HTML'}
    );
    // query?.message?.chat.id && bot.sendInvoice(
    //   query.message.chat.id,
    //   'Тайный взнос',
    //   'Взнос в Тайную Лигу Леди и Джентльменов. ',
    //   'payment_received',
    //   process.env.PAYMENT_TOKEN || 'PAYMENT_TOKEN',
    //   '',
    //   'RUB',
    //   [{ label: '1000 RUB', amount: 100000}],
    // );
  }
});
