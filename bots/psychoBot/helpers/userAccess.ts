import TelegramBot from 'node-telegram-bot-api';
import { extractHashtags } from '../../helpers';

if (!process.env.PSYCHO) {
  throw new Error('Telegram API key is needed');
}

const WHITE_LIST_IDS = process.env.WHITE_LIST_IDS?.split(',') || [];

export type TUserAccess = {
  whiteListUser: boolean;
  canReply: boolean;
  hashTags: { [key: string]: boolean; }
}

export const createUserAccess = (msg: TelegramBot.Message, cmdRelated: boolean): TUserAccess => {
  const { text, chat: { type: chatType }, from } = msg;
  const hashTags = extractHashtags(text || '');
  const userId = from?.id?.toString();
  const whiteListUser = !!userId && WHITE_LIST_IDS.includes(userId);
  const canReply = !cmdRelated && (chatType === 'private') && !!userId && whiteListUser;

  return {
    whiteListUser,
    canReply,
    hashTags,
  }
}
