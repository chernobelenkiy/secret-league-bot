import { MessageStorageManager } from '../controllers/prompt';
import { TMessage, TChatSettings } from '../types';

describe('StorageManager', () => {
  let storage: MessageStorageManager;
  let chatSettings: TChatSettings;

  beforeEach(() => {
    storage = new MessageStorageManager();
    chatSettings = {
      chatId: 123,
      fromId: 456
    };
  });

  test('add and get messages', () => {
    const message1: TMessage = { content: 'Hello, world!', role: 'assistant' };
    const message2: TMessage = { content: 'How are you?', role: 'user' };

    storage.add(chatSettings, message1.content, message1.role);
    storage.add(chatSettings, message2.content, message2.role);

    const messages = storage.get(chatSettings);
    expect(messages).toEqual([message1, message2]);
  });

  test('get messages for non-existent chat/user', () => {
    const messages = storage.get(chatSettings);
    expect(messages).toEqual([]);
  });
});