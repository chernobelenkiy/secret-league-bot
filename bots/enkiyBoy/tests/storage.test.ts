import { StorageManager } from '../storage';

describe('StorageManager', () => {
  let storage: StorageManager;

  beforeEach(() => {
    storage = new StorageManager();
  });

  test('add and get messages', () => {
    const chatId = 123;
    const userId = 456;
    const message1 = 'Hello, world!';
    const message2 = 'How are you?';

    storage.add(chatId, userId, message1);
    storage.add(chatId, userId, message2);

    const messages = storage.get(chatId, userId);

    expect(messages).toEqual([message1, message2]);
  });

  test('get messages for non-existent chat/user', () => {
    const chatId = 123;
    const userId = 456;

    const messages = storage.get(chatId, userId);

    expect(messages).toEqual([]);
  });
});