import { ICommand, TContext } from '../../../types';

export class ResetCommand implements ICommand {
  execute(ctx: TContext) {
    ctx.cmd.resetCommand(ctx);
    ctx.prompt.resetMessags(ctx);
  }
}
