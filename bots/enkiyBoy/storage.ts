import { TRole, TMessage } from '../types';

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

export class StorageManager {
  private storage: Map<string, Messages>;

  constructor() {
    this.storage = new Map<string, Messages>();
  }

  private key(chatId: number, userId?: number) {
    return userId ? `${chatId}_${userId}` : chatId.toString();
  }

  public add(chatId: number, userId: number | undefined, content: string, role: TRole) {
    const key = this.key(chatId, userId);
    const storage = this.storage.get(key) || new Messages();

    storage.add(content, role);
    this.storage.set(key, storage);
  } 

  public get(chatId: number, userId?: number): TMessage[] {
    const key = this.key(chatId, userId);
    const storage = this.storage.get(key) || new Messages();

    return storage.getMessages();
  }
}

export const storageManager = new StorageManager();