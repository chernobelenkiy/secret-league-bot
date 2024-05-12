import TelegramBot from "node-telegram-bot-api";

const WHITE_LIST_IDS = process.env.NASTY_WHITE_LIST_IDS?.split(",") || [];
const ADMIN_IDS = process.env.NASTY_ADMIN_IDS?.split(",") || [];

export type TUserAccess = {
  fromAdmin: boolean;
  canReply: boolean;
  fromPrivate: boolean;
  userId: string | undefined;
};

export const onCreateUserAccess = (
  botInfo: TelegramBot.User,
  msg: TelegramBot.Message
): TUserAccess => {
  const chatType = msg.chat.type;
  const userId = msg?.from?.id?.toString();

  const fromId = msg.reply_to_message?.from?.id;
  const isReplyToBot = fromId === botInfo?.id;
  const fromAdmin = ADMIN_IDS.includes(userId as string);
  const fromChannel =
    (chatType === "channel" || chatType === "supergroup") && fromAdmin;
  const fromWhitelistedUserInPrivate =
    chatType === "private" && WHITE_LIST_IDS.includes(userId as string);

  const canReply = fromChannel || isReplyToBot || fromWhitelistedUserInPrivate;

  return {
    fromAdmin,
    fromPrivate: chatType === "private",
    canReply,
    userId,
  };
};
