import TelegramBot from 'node-telegram-bot-api';
import { createContext } from './ctx';
import { EPayloads } from './types';

if (!process.env.PSYCHO_KEY) {
  throw new Error('Telegram API key is needed');
}

const bot = new TelegramBot(process.env.PSYCHO_KEY, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;
  console.log('++++++++++++++++++++');
  
  let ctx = createContext(msg, bot);
  const isCMDRelated = ctx.cmd.canCommand(ctx) || ctx.cmd.isCommand(msg.text);
  
  console.group();
  console.log('message: ', msg.text);
  console.log('data ', ctx.data);
  console.log('userAccess: ', ctx.userAccess);
  console.groupEnd();
  
  if (ctx.userAccess.canReply && !isCMDRelated) {
    ctx = ctx.prompt.createPrompts(ctx, msg.text);
    console.log('prompts: ', ctx.prompts);
    const response = await ctx.prompt.generate(ctx);
    if (!response) return;

    await bot.sendMessage(
      msg.chat.id,
      response,
      { reply_to_message_id: msg.message_id, parse_mode: 'HTML' }
    );
  } else if (ctx.cmd.canCommand(ctx)) {
    ctx.cmd.command(ctx);
  }
});

bot.onText(/\/start/, (msg) => {
  const ctx = createContext(msg, bot);
  ctx.cmd.command(ctx, EPayloads.start);
});

// Listen for button clicks
bot.on('callback_query', (query) => {
  if (!query.message || !query.data) return;
  const ctx = createContext(query.message, bot);
  ctx.cmd.command(ctx, query.data);
});