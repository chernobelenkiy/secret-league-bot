import { ICommand, TContext } from '../../../types';
import { EPayloads } from '../types';

const replyMarkup = {
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
    const { cmd, systemPrompt, bot } = ctx;
    if (!cmd) return;

    if (cmd.hasCommand(ctx, EPayloads.prompt)) {
      systemPrompt.savePrompt(ctx, ctx.data.text);
      cmd.resetCommand(ctx);
    } else {
      cmd.saveCommand(ctx, EPayloads.prompt);
      bot?.sendMessage(ctx.data.chatId, `
        Добавьте системный промпт для бота.
        Текущий промпт: ${systemPrompt.getPrompt(ctx)}
      `, replyMarkup);
    }
  }
}
