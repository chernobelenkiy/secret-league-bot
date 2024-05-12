import TelegramBot from "node-telegram-bot-api";
import { onCreateUserAccess as createAccess } from "../../helpers/onUserAccess";

const WHITE_LIST_IDS = process.env.ENKIY_WHITE_LIST_IDS?.split(",") || [];
const ADMIN_IDS = process.env.ENKIY_ADMIN_IDS?.split(",") || [];

export const onCreateUserAccess = async (
  botInfo: TelegramBot.User,
  msg: TelegramBot.Message,
  bot: TelegramBot
) => {
  return await createAccess(botInfo, msg, bot, WHITE_LIST_IDS, ADMIN_IDS);
};
