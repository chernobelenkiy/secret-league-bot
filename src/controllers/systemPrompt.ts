import { TChatSettings, ISystemPromptManager } from '../types';

class SystemPromptStorage {
  private storage: Map<string, string> = new Map();

  private key({ fromId, chatId }: TChatSettings) {
    return fromId ? `${chatId}_${fromId}` : chatId.toString();
  }

  public add(settings: TChatSettings, prompt: string) {
    const key = this.key(settings);
    this.storage.set(key, prompt);
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

const storage = new SystemPromptStorage();

export class SystemPromptManager implements ISystemPromptManager {
  private storage: SystemPromptStorage = storage;
  private default: string;
  private chatSettings: TChatSettings;

  constructor(defaultPrompt: string, chatSettings: TChatSettings) {
    this.default = defaultPrompt;
    this.chatSettings = chatSettings;
  }

  generatePrompt() {
    return this.getPrompt();
  }

  getPrompt() {
    return this.storage.get(this.chatSettings) || this.default;
  }

  savePrompt(prompt: string) {
    this.storage.add(this.chatSettings, prompt);
  }

  resetPrompt() {
    this.storage.reset(this.chatSettings);
  }
}