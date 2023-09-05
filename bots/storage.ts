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

  private key(chatId: number, userId?: number) {
    return userId ? `${chatId}_${userId}` : chatId.toString();
  }

  public add(chatId: number, userId: number | undefined, content: string, role: TRole) {
    const key = this.key(chatId, userId);
    const messages = this.storage.get(key) || new Messages();

    messages.add(content, role);
    this.storage.set(key, messages);
  } 

  public get(chatId: number, userId?: number): TMessage[] {
    const key = this.key(chatId, userId);
    const storage = this.storage.get(key) || new Messages();

    return storage.getMessages();
  }

  public reset(chatId: number, userId?: number): void {
    const key = this.key(chatId, userId);
    this.storage.delete(key);
  }
}

export class CommandStorageManager {
  private storage: Map<string, boolean>;

  private key(chatId: number, userId?: number) {
    return userId ? `${chatId}_${userId}` : chatId.toString();
  }

  public add(chatId: number, userId: number | undefined, value: boolean) {
    const key = this.key(chatId, userId);
    this.storage.set(key, value);
  } 

  public get(chatId: number, userId?: number): boolean {
    const key = this.key(chatId, userId);
    return this.storage.get(key);;
  }

  public reset(chatId: number, userId?: number): void {
    const key = this.key(chatId, userId);
    this.storage.delete(key);
  }
}
