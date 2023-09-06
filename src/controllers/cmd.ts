import { ICommandsManager, TContext, TChatData } from '../types';

class CommandStorageManager {
  private storage: Map<string, string> = new Map();

  private key({ fromId, chatId }: TChatData) {
    return fromId ? `${chatId}_${fromId}` : chatId.toString();
  }

  public add(data: TChatData, cmd: string) {
    const key = this.key(data);
    this.storage.set(key, cmd);
  } 

  public get(data: TChatData): string | undefined {
    const key = this.key(data);
    return this.storage.get(key);;
  }

  public reset(data: TChatData): void {
    const key = this.key(data);
    this.storage.delete(key);
  }
}

const COMMANDS = ['/start']
const storage = new CommandStorageManager();

export class CommandsManager implements ICommandsManager {
  protected storage: CommandStorageManager = storage;

  isCommand(cmd: string) {
    return COMMANDS.includes(cmd);
  }

  canCommand(ctx: TContext) {
    return !!this.storage.get(ctx.chatData);
  }

  getCommand(ctx: TContext) {
    return this.storage.get(ctx.chatData);
  }

  saveCommand(ctx: TContext, cmd: string) {
    this.storage.add(ctx.chatData, cmd);
  }

  hasCommand(ctx: TContext, cmd: string) {
    return this.storage.get(ctx.chatData) === cmd;
  }

  resetCommand(ctx: TContext) {
    this.storage.reset(ctx.chatData);
  }
}
