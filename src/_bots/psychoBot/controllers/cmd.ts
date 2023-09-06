import { CommandsManager } from '../../../controllers/cmd';
import { ICommandsManager, TContext } from '../../../types';
import { PromptCommand, ResetCommand, CancelCommand } from '../commands';
import { EPayloads } from '../types';

const commands = {
  [EPayloads.prompt]: PromptCommand,
  [EPayloads.reset]: ResetCommand,
  [EPayloads.cancel]: CancelCommand
}

export class PsychoCommandsManager extends CommandsManager implements ICommandsManager {
  findCommand(ctx: TContext, cmd?: string) {
    cmd = cmd || this.getCommand(ctx);
    return cmd ? commands[cmd] || null : null;
  }

  command(ctx: TContext, cmd?: string) {
    const command = this.findCommand(ctx, cmd);
    command?.execute(ctx);
  }
}
