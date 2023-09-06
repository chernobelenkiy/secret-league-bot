import TelegramBot from 'node-telegram-bot-api';
import { createContext } from './ctx';

if (!process.env.ENKIY_KEY) {
  throw new Error('Telegram API key is needed');
}

const bot = new TelegramBot(process.env.ENKIY_KEY, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;
  const botInfo = await bot.getMe();
  let ctx = createContext(msg, botInfo, bot);
  
  console.group();
  console.log('message: ', msg.text);
  console.log('ctx: ', ctx);
  console.groupEnd();
  
  if (ctx.userAccess.canReply || ctx.userAccess.canReplyToUser) {
    ctx = ctx.prompt.createPrompts(ctx, msg.text);
    const response = await ctx.prompt.generate(ctx);
    console.log('prompts: ', ctx.prompts);
    if (!response) return;
    await bot.sendMessage(msg.chat.id, response, { reply_to_message_id: msg.message_id, parse_mode: 'HTML' });
  }
});