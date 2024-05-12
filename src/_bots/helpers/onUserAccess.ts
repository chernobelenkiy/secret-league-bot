import TelegramBot from "node-telegram-bot-api";
import { isMessageFromAdminInSupergroup } from "./helpers";

export type TUserAccess = {
  fromAdmin: boolean;
  canReply: boolean;
  fromPrivate: boolean;
};

export const onCreateUserAccess = async (
  botInfo: TelegramBot.User,
  msg: TelegramBot.Message,
  bot: TelegramBot,
  whiteListIds: string[],
  adminIds: string[]
): Promise<TUserAccess> => {
  const chatType = msg.chat.type;
  const userId = msg?.from?.id?.toString();

  const fromAdmin =
    (await isMessageFromAdminInSupergroup(msg, bot)) ||
    adminIds.includes(userId as string);
  const fromId = msg.reply_to_message?.from?.id;
  const isReplyToBot = fromId === botInfo?.id;
  const fromChannel =
    (chatType === "channel" || chatType === "supergroup") && fromAdmin;
  const fromWhitelistedUserInPrivate =
    chatType === "private" && whiteListIds.includes(userId as string);

  const canReply = fromChannel || isReplyToBot || fromWhitelistedUserInPrivate;

  return {
    fromAdmin,
    fromPrivate: chatType === "private",
    canReply,
  };
};