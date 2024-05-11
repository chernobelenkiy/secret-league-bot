import TelegramBot from "node-telegram-bot-api";

const WHITE_LIST_IDS = process.env.NASTY_WHITE_LIST_IDS?.split(",") || [];
const ADMIN_IDS = process.env.NASTY_ADMIN_IDS?.split(",") || [];

export type TUserAccess = {
  fromOtherUser: boolean;
  fromAdmin: boolean;
  fromChannelOrSupergroup: boolean;
  canReply: boolean;
  canReplyToUser: boolean;
};

export const onCreateUserAccess = (
  botInfo: TelegramBot.User,
  msg: TelegramBot.Message
): TUserAccess => {
  const chatType = msg.chat.type;
  const userId = msg?.from?.id?.toString();
  const whiteListUser = !!userId && WHITE_LIST_IDS.includes(userId);
  const fromId = msg.reply_to_message?.from?.id;
  const fromChannel = chatType === "channel";
  const fromSupergroup = chatType === "supergroup";
  const fromAdmin = ADMIN_IDS.includes(userId as string);

  const fromOtherUser =
    !fromAdmin &&
    (fromSupergroup || chatType === "private" || chatType === "group");

  const canReply =
    fromAdmin ||
    ((fromId === botInfo?.id || fromChannel) &&
      (fromChannel || fromSupergroup));

  const canReplyToUser =
    chatType === "private" && !!userId && (fromAdmin || whiteListUser);

  return {
    fromOtherUser,
    fromAdmin,
    fromChannelOrSupergroup: fromChannel || fromSupergroup,
    canReply,
    canReplyToUser,
  };
};
