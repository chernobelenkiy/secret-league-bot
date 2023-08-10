import TelegramBot from 'node-telegram-bot-api';

if (!process.env.ENKIY) {
  throw new Error('Telegram API key is needed');
}

export type TUserAccess = {
  adminUser: boolean;
  whiteListUser: boolean;
  adminChat: boolean;
  channel: boolean;
  admin: boolean;
  canReply: boolean;
  canReplyToUser: boolean;
}

const WHITE_LIST_IDS = process.env.WHITE_LIST_IDS?.split(',') || [];

export const createTechincalTags = (userAccess: TUserAccess) => {
  const tags: string[] = [];
  tags.push(userAccess.admin ? 'Сообщение пришло от админа' : 'Сообщение пришло от пользователя');
  if (userAccess.channel) {
    tags.push('с канала');
  }
  return tags;
}

export const createUserAccess = (
  msg: TelegramBot.Message,
  botInfo: TelegramBot.User,
  hashTags: { [key: string]: boolean }
): TUserAccess => {
  const chatType = msg.chat.type;
  const userId = msg?.from?.id?.toString();
  const adminUser = userId === process.env.ADMIN_ID;
  const whiteListUser = !!userId && WHITE_LIST_IDS.includes(userId);
  const adminChat = userId === process.env.ADMIN_CHAT_ID;
  const channel = userId === process.env.ADMIN_CHANNEL_USER_ID;
  const admin = adminUser || adminChat || channel;
  const fromId = msg.reply_to_message?.from?.id;

  const canReply = adminUser ||
    ((fromId === botInfo.id || channel) &&
    (chatType === 'channel' || chatType === 'supergroup'));
  const canReplyToUser = (chatType === 'private') && !!userId && (adminUser || whiteListUser);

  return {
    adminUser,
    whiteListUser,
    adminChat,
    channel,
    admin,
    canReply: !hashTags.nobot && canReply,
    canReplyToUser,
  }
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