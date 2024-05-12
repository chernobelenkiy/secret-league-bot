import TelegramBot from "node-telegram-bot-api";

export const isMessageFromAdminInSupergroup = async (
  msg: TelegramBot.Message,
  bot: TelegramBot
): Promise<boolean> => {
  if (
    (msg.chat.type !== "supergroup" && msg.chat.type !== "channel") ||
    !msg.from?.id
  ) {
    return false;
  }

  try {
    const chatMember = await bot.getChatMember(msg.chat.id, msg.from.id);
    console.log("chatMember: ", chatMember);
    return (
      chatMember.status === "administrator" || chatMember.status === "creator"
    );
  } catch (error) {
    console.error("Failed to get chat member info:", error);
    return false;
  }
};
