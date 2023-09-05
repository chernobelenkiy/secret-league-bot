import TelegramBot from 'node-telegram-bot-api';
import { CommandsManager } from '../commands';
import { ICommand, ICommandsManager, TContext, TChatSettings } from '../types';

export enum EPayloads {
  prompt = 'prompt',
  reset = 'reset'
}

class PromptCommand implements ICommand {
  execute(ctx: TContext) {
    if (ctx.cmd.hasCommand(EPayloads.prompt)) {
      ctx.cmd.resetCommand();

    } else {
      ctx.cmd.saveCommand(EPayloads.prompt);
      ctx.bot.sendMessage(ctx.settings.chatId, 'Добавьте системный промпт для бота.');
    }
  }
}

class ResetCommand implements ICommand {
  execute(ctx: TContext) {
    ctx.cmd.resetCommand();
  }
}

export class PsychoCommandsManager extends CommandsManager implements ICommandsManager {
  constructor(chatSettings: TChatSettings) {
    super(chatSettings);
  }

  findCommand(cmd?: string) {
    cmd = cmd || this.getCommand();
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
    const command = this.findCommand(cmd);
    command?.execute(ctx);
  }
}