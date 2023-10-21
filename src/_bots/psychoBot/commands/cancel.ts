import { ICommand, TContext } from 'yes-bot-lib';
import { EPayloads } from '../types';

export class CancelCommand implements ICommand {
  execute(ctx: TContext) {
    ctx.cmd.resetCommand(ctx);
    ctx.cmd.command(ctx, EPayloads.start);
    ctx.bot.sendMessage(ctx.data.chatId, 'Действе отменено.');
  }
}
