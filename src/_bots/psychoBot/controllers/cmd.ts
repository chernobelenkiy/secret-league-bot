import { CommandsManager } from '../../../controllers/cmd';
import { ICommandsManager, TContext } from '../../../types';
import { EPayloads } from '../types';
import { PromptCommand, ResetCommand } from './commands';

const commands = {
  [EPayloads.prompt]: PromptCommand,
  [EPayloads.reset]: ResetCommand
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
