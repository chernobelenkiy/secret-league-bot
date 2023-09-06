import { ICommand, TContext } from '../../../types';

export class CancelCommand implements ICommand {
  execute(ctx: TContext) {
    ctx.cmd?.resetCommand(ctx);
  }
}
