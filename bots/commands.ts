import { TChatSettings, ICommandsManager, TContext } from './types';

class CommandStorageManager {
  private storage: Map<string, string> = new Map();

  private key({ fromId, chatId }: TChatSettings) {
    return fromId ? `${chatId}_${fromId}` : chatId.toString();
  }

  public add(settings: TChatSettings, cmd: string) {
    const key = this.key(settings);
    this.storage.set(key, cmd);
  } 

  public get(settings: TChatSettings): string | undefined {
    const key = this.key(settings);
    return this.storage.get(key);;
  }

  public reset(settings: TChatSettings): void {
    const key = this.key(settings);
    this.storage.delete(key);
  }
}

const COMMANDS = ['/start']
const storage = new CommandStorageManager();

export class CommandsManager implements ICommandsManager {
  protected storage: CommandStorageManager = storage;
  public chatSettings: TChatSettings;

  constructor(chatSettings: TChatSettings) {
    this.chatSettings = chatSettings;
  }

  command(_: TContext) {
    throw new Error('Method not implemented.');
  }

  isCommand(cmd: string) {
    return COMMANDS.includes(cmd);
  }

  canCommand() {
    return !!this.storage.get(this.chatSettings);
  }

  getCommand() {
    return this.storage.get(this.chatSettings);
  }

  saveCommand(cmd: string) {
    this.storage.add(this.chatSettings, cmd);
  }

  hasCommand(cmd: string) {
    return this.storage.get(this.chatSettings) === cmd;
  }

  resetCommand() {
    this.storage.reset(this.chatSettings);
  }
}
