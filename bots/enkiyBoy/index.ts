import TelegramBot from 'node-telegram-bot-api';
import { generate } from '../generate';

if (!process.env.ENKIY) {
  throw new Error('Telegram API key is needed');
}

type TUserAccess = {
  adminUser: boolean;
  whiteListUser: boolean;
  adminChat: boolean;
  channel: boolean;
  admin: boolean;
  canReply: boolean;
  canReplyToUser: boolean;
}

const bot = new TelegramBot(process.env.ENKIY, { polling: true });
const WHITE_LIST_IDS = process.env.WHITE_LIST_IDS?.split(',') || [];

const createTechincalTags = (userAccess: TUserAccess) => {
  const tags: string[] = [];
  tags.push(userAccess.admin ? 'Сообщение пришло от админа' : 'Сообщение пришло от пользователя');
  if (userAccess.channel) {
    tags.push('с канала');
  }
  return tags;
}

const createUserAccess = (
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

const extractHashtags = (msg: string) => {
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

bot.on('message', async (msg) => {
  if (!msg.text) return;
  const botInfo = await bot.getMe();
  const { hashTags, parsedMessage } = extractHashtags(msg.text);
  const userAccess = createUserAccess(msg, botInfo, hashTags);
  
  console.group();
  console.log('message: ', msg.text);
  console.log('userAccess: ', userAccess);
  console.log('userId: ', msg.from?.id);
  console.log('chatType: ', msg.chat.type);
  console.log('hashTags: ', hashTags);
  
  if (userAccess.canReply || userAccess.canReplyToUser) {
    const response = await generate(parsedMessage, createTechincalTags(userAccess));
    if (!response) return;
    console.log('response: ', response);
    console.groupEnd();
    await bot.sendMessage(msg.chat.id, response, { reply_to_message_id: msg.message_id, parse_mode: 'HTML' });
  }
});