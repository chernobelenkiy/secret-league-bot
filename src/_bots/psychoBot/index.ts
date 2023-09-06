import TelegramBot from 'node-telegram-bot-api';
import { createContext } from './ctx';

if (!process.env.PSYCHO_KEY) {
  throw new Error('Telegram API key is needed');
}

const bot = new TelegramBot(process.env.PSYCHO_KEY, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;
  
  let ctx = createContext(msg, bot);
  const isCMDRelated = ctx.cmd?.canCommand(ctx) || ctx.cmd?.isCommand(msg.text);
  
  console.group();
  console.log('message: ', msg.text);
  console.log('ctx: ', ctx);
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
  } else if (ctx.cmd?.canCommand(ctx)) {
    // cmdManager.command();
  }
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Выбери из меню', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Prompt', callback_data: 'prompt' },
          { text: 'Reset', callback_data: 'reset' },
        ],
      ],
    },
  });
});

// Listen for button clicks
bot.on('callback_query', (query) => {
  // new PsychoCommandsManager(query.message).command(query.data);
});