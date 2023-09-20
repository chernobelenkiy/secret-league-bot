import TelegramBot from 'node-telegram-bot-api';
import { ICommand, TContext } from '../../../types';
import { EPayloads } from '../types';

const sendOptions: TelegramBot.SendMessageOptions = {
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Отменить', callback_data: 'cancel' },
      ],
    ],
  }
};

export class PromptCommand implements ICommand {
  execute(ctx: TContext) {
    const { cmd, systemPrompt, bot, prompt } = ctx;
    if (cmd.hasCommand(ctx, EPayloads.prompt)) {
      systemPrompt.savePrompt(ctx, ctx.data.text);
      cmd.resetCommand(ctx);
      prompt.resetMessags(ctx);
      bot.sendMessage(ctx.data.chatId, `
        Новый промпт: ${systemPrompt.getPrompt(ctx)}`);
    } else {
      cmd.saveCommand(ctx, EPayloads.prompt);
      bot.sendMessage(ctx.data.chatId, `
        <b>Добавьте системный промпт для бота</b>\n\nТекущий промпт:\n<i>${systemPrompt.getPrompt(ctx)}</i>`,
        sendOptions);
    }
  }
}
