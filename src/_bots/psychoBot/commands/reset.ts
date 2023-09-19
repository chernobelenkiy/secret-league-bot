import { ICommand, TContext } from '../../../types';

export class ResetCommand implements ICommand {
  execute(ctx: TContext) {
    ctx.cmd.resetCommand(ctx);
    ctx.prompt.resetMessags(ctx);
    ctx.bot.sendMessage(ctx.data.chatId, 'Системный промпт и история сообщений очищены.');
  }
}
