import TelegramBot from 'node-telegram-bot-api';
import { extractHashtags } from 'yes-bot-lib';

const WHITE_LIST_IDS = process.env.WHITE_LIST_IDS?.split(',') || [];

export type TUserAccess = {
  adminUser: boolean;
  whiteListUser: boolean;
  adminChat: boolean;
  channel: boolean;
  admin: boolean;
  canReply: boolean;
  canReplyToUser: boolean;
  hashTags: { [key: string]: boolean; }
}


export const createUserAccess = (
  msg: TelegramBot.Message,
  botInfo: TelegramBot.User,
): TUserAccess => {
  const hashTags = extractHashtags(msg?.text || '');
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
    hashTags,
  }
}
