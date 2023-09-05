import TelegramBot from 'node-telegram-bot-api';
import { CommandStorageManager } from './storage';
import { createChatSettings } from './chatSettings';
import { TChatSettings, EPayloads } from './types';

const COMMANDS = ['/start']
const storage = new CommandStorageManager();

export class CommandsManager {
  private storage: CommandStorageManager = storage;
  private chatSettings: TChatSettings;

  constructor(msg: TelegramBot.Message) {
    this.chatSettings = createChatSettings(msg);
  }

  isCommand(cmd: string) {
    return COMMANDS.includes(cmd);
  }

  isActive(cmd: EPayloads) {
    
  }

  reset() {
    this.storage.reset(this.chatSettings);
  }
}
