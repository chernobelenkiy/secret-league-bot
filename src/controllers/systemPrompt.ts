import { TContext, TChatData, ISystemPromptManager } from '../types';

class SystemPromptStorage {
  private storage: Map<string, string> = new Map();

  private key({ fromId, chatId }: TChatData) {
    return fromId ? `${chatId}_${fromId}` : chatId.toString();
  }

  public add(data: TChatData, prompt: string) {
    const key = this.key(data);
    this.storage.set(key, prompt);
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

const storage = new SystemPromptStorage();

export class SystemPromptManager implements ISystemPromptManager {
  private storage: SystemPromptStorage = storage;
  private default: string;

  constructor(defaultPrompt: string) {
    this.default = defaultPrompt;
  }

  generate(ctx: TContext) {
    return this.getPrompt(ctx);
  }

  getPrompt(ctx: TContext) {
    return this.storage.get(ctx.data) || this.default;
  }

  savePrompt(ctx: TContext, prompt: string) {
    this.storage.add(ctx.data, prompt);
  }

  resetPrompt(ctx: TContext) {
    this.storage.reset(ctx.data);
  }
}