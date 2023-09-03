import { StorageManager } from '../storage';
import { TMessage } from '../types';

describe('StorageManager', () => {
  let storage: StorageManager;

  beforeEach(() => {
    storage = new StorageManager();
  });

  test('add and get messages', () => {
    const chatId = 123;
    const userId = 456;
    const message1: TMessage = { content: 'Hello, world!', role: 'assistant' };
    const message2: TMessage = { content: 'How are you?', role: 'user' };

    storage.add(chatId, userId, message1.content, message1.role);
    storage.add(chatId, userId, message2.content, message2.role);

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