class Messages {
  private queue: string[] = [];

  public add(str: string) {
    this.queue.push(str);
    if (this.queue.length > 20) {
      this.queue.shift();
    }
  }

  public getMessages(): string[] {
    return this.queue;
  }
}

export class StorageManager {
  private storage: Map<string, Messages>;

  constructor() {
    this.storage = new Map<string, Messages>();
  }

  private key(chatId: number, userId: number) {
    return `${chatId}_${userId}`;
  }

  public add(chatId: number, userId: number, text: string) {
    const key = this.key(chatId, userId);
    const storage = this.storage.get(key) || new Messages();

    storage.add(text)
    this.storage.set(key, storage);
  } 

  public get(chatId: number, userId: number): string[] {
    const key = this.key(chatId, userId);
    const storage = this.storage.get(key) || new Messages();

    return storage.getMessages();
  }
}
