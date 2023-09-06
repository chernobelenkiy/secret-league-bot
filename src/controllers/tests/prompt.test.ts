import { MessageStorageManager } from '../prompt';
import { TMessage, TChatData } from '../../types';

describe('StorageManager', () => {
  let storage: MessageStorageManager;
  let data: TChatData;

  beforeEach(() => {
    storage = new MessageStorageManager();
    data = {
      chatId: 123,
      fromId: 456
    };
  });

  test('add and get messages', () => {
    const message1: TMessage = { content: 'Hello, world!', role: 'assistant' };
    const message2: TMessage = { content: 'How are you?', role: 'user' };

    storage.add(data, message1.content, message1.role);
    storage.add(data, message2.content, message2.role);

    const messages = storage.get(data);
    expect(messages).toEqual([message1, message2]);
  });

  test('get messages for non-existent chat/user', () => {
    const messages = storage.get(data);
    expect(messages).toEqual([]);
  });
});