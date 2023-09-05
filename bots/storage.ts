import { TChatSettings } from './types';
import { TRole, TMessage } from './types';

const LIMIT = 40;

class Messages {
  private queue: TMessage[] = [];

  public add(content: string, role: TRole) {
    this.queue.push({ content, role });
    if (this.queue.length > LIMIT) {
      this.queue.shift();
    }
  }

  public getMessages(): TMessage[] {
    return this.queue;
  }
}

export class MessageStorageManager {
  private storage: Map<string, Messages>;

  constructor() {
    this.storage = new Map<string, Messages>();
  }

  private key({ fromId, chatId }: TChatSettings) {
    return fromId ? `${chatId}_${fromId}` : chatId.toString();
  }

  public add(settings: TChatSettings, content: string, role: TRole) {
    const key = this.key(settings);
    const messages = this.storage.get(key) || new Messages();

    messages.add(content, role);
    this.storage.set(key, messages);
  } 

  public get(settings: TChatSettings): TMessage[] {
    const key = this.key(settings);
    const storage = this.storage.get(key) || new Messages();

    return storage.getMessages();
  }

  public reset(settings: TChatSettings): void {
    const key = this.key(settings);
    this.storage.delete(key);
  }
}

export class CommandStorageManager {
  private storage: Map<string, string>;

  private key({ fromId, chatId }: TChatSettings) {
    return fromId ? `${chatId}_${fromId}` : chatId.toString();
  }

  public add(settings: TChatSettings, cmd: string) {
    const key = this.key(settings);
    this.storage.set(key, cmd);
  } 

  public get(settings: TChatSettings): string {
    const key = this.key(settings);
    return this.storage.get(key);;
  }

  public reset(settings: TChatSettings): void {
    const key = this.key(settings);
    this.storage.delete(key);
  }
}
