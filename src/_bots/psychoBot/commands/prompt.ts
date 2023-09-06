import { ICommand, TContext } from '../../../types';
import { EPayloads } from '../types';

export class PromptCommand implements ICommand {
  execute(ctx: TContext) {
    if (!ctx.cmd) return;

    if (ctx.cmd.hasCommand(ctx, EPayloads.prompt)) {
      ctx.cmd.resetCommand(ctx);
    } else {
      ctx.cmd.saveCommand(ctx, EPayloads.prompt);
      ctx.bot?.sendMessage(ctx.chatData.chatId, 'Добавьте системный промпт для бота.');
    }
  }
}
