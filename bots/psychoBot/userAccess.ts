import TelegramBot from 'node-telegram-bot-api';
import { extractHashtags } from '../hashTags';

if (!process.env.PSYCHO) {
  throw new Error('Telegram API key is needed');
}

const WHITE_LIST_IDS = process.env.WHITE_LIST_IDS?.split(',') || [];

export type TUserAccess = {
  whiteListUser: boolean;
  canReply: boolean;
  hashTags: { [key: string]: boolean; }
}

export const createUserAccess = (msg: TelegramBot.Message): TUserAccess => {
  const hashTags = extractHashtags(msg?.text || '');
  const chatType = msg.chat.type;
  const userId = msg?.from?.id?.toString();
  const whiteListUser = !!userId && WHITE_LIST_IDS.includes(userId);
  const canReply = (chatType === 'private') && !!userId && whiteListUser;

  return {
    whiteListUser,
    canReply,
    hashTags,
  }
}
