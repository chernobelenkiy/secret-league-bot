import { CommandsManager } from '../../../controllers/commands';
import { ICommand, ICommandsManager, TContext } from '../../../types';

export enum EPayloads {
  prompt = 'prompt',
  reset = 'reset'
}

class PromptCommand implements ICommand {
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

class ResetCommand implements ICommand {
  execute(ctx: TContext) {
    ctx.cmd?.resetCommand(ctx);
  }
}

export class PsychoCommandsManager extends CommandsManager implements ICommandsManager {
  findCommand(ctx: TContext, cmd?: string) {
    cmd = cmd || this.getCommand(ctx);
    switch(cmd) {
      case EPayloads.prompt:
        return new PromptCommand();
      case EPayloads.reset:
        return new ResetCommand();
      default:
        return null;
    }
  }

  command(ctx: TContext, cmd?: string) {
    const command = this.findCommand(ctx, cmd);
    command?.execute(ctx);
  }
}