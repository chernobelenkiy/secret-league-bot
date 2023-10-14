import TelegramBot from 'node-telegram-bot-api';

export type TUserAccess = {
  canReply: boolean;
  canReplyToUser: boolean;
}


export const createUserAccess = (
  msg: TelegramBot.Message,
  botInfo: TelegramBot.User,
): TUserAccess => {
  const chatType = msg.chat.type;
  const userId = msg?.from?.id?.toString();
  
  const fromId = msg.reply_to_message?.from?.id;

  const canReply =((fromId === botInfo.id) &&
    (chatType === 'channel' || chatType === 'supergroup'));
  const canReplyToUser = (chatType === 'private') && !!userId;

  return {
    canReply,
    canReplyToUser,
  }
}
