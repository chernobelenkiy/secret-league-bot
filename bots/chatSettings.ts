import TelegramBot from 'node-telegram-bot-api';

export const createChatSettings = (msg: TelegramBot.Message) => ({
  chatId: msg.chat.id,
  fromId: msg.from?.id 
});
