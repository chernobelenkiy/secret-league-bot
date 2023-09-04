import TelegramBot from 'node-telegram-bot-api';

if (!process.env.PSYCHO) {
  throw new Error('Telegram API key is needed');
}

const WHITE_LIST_IDS = process.env.WHITE_LIST_IDS?.split(',') || [];

export type TUserAccess = {
  whiteListUser: boolean;
  canReply: boolean;
  message: string;
  hashTags: { [key: string]: boolean; }
}

export const extractHashtags = (msg: string) => {
  const hashtagRegex = /#\w+/g;
  const hashMatches = msg.match(hashtagRegex);
  const hashTags = {} as { [key: string]: boolean };
  const msgWithoutHashtags = msg.replace(hashtagRegex, "");

  if (hashMatches) {
    hashMatches.forEach((hashtag) => {
      hashTags[hashtag.replace('#', '')] = true;
    });
  }

  return {
    hashTags,
    parsedMessage: msgWithoutHashtags
  };
}

export const createUserAccess = (
  msg: TelegramBot.Message,
  botInfo: TelegramBot.User,
): TUserAccess => {
  const { hashTags, parsedMessage } = extractHashtags(msg?.text || '');
  const chatType = msg.chat.type;
  const userId = msg?.from?.id?.toString();
  const whiteListUser = !!userId && WHITE_LIST_IDS.includes(userId);
  const canReply = (chatType === 'private') && !!userId && whiteListUser;

  return {
    whiteListUser,
    canReply,
    hashTags,
    message: parsedMessage,
  }
}
