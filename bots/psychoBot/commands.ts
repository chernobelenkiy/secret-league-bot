import { CommandStorageManager } from '../storage';

const COMMANDS = ['/start']

export class CommandsManager {
  private storage: CommandStorageManager;

  constructor() {
    this.storage = this.storage;
  }

  isCommand(cmd: string) {
    return COMMANDS.includes(cmd);
  }
}
