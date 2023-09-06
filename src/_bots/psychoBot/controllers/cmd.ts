import { CommandsManager } from '../../../controllers/cmd';
import { ICommandsManager, TContext } from '../../../types';
import { PromptCommand, StartCommand, ResetCommand, CancelCommand } from '../commands';
import { EPayloads } from '../types';

const commands = {
  [EPayloads.prompt]: new PromptCommand(),
  [EPayloads.reset]: new ResetCommand(),
  [EPayloads.cancel]: new CancelCommand(),
  [EPayloads.start]: new StartCommand()
}

export class PsychoCommandsManager extends CommandsManager implements ICommandsManager {
  private findCommand(ctx: TContext, cmd?: string) {
    cmd = cmd || this.getCommand(ctx);
    return cmd ? commands[cmd] || null : null;
  }

  command(ctx: TContext, cmd?: string) {
    const command = this.findCommand(ctx, cmd);
    console.log('found command: ', command);
    command?.execute(ctx);
  }
}
