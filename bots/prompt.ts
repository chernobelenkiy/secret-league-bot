import { Configuration, OpenAIApi } from 'openai';
import { removeHashtags } from './hashTags';
import { TMessage, ISystemPrompt, TRole, TChatSettings } from './types';

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
  private storage: Map<string, Messages> = new Map<string, Messages>();

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

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const storage = new MessageStorageManager();

//ToDo decouple settings and saving?
export class PromptManager {
  private prompts: TMessage[] = [];
  private storage: MessageStorageManager = storage;
  private chatSettings: TChatSettings;

  constructor(systemPrompt: ISystemPrompt, chatSettings: TChatSettings, text: string) {
    this.chatSettings = chatSettings;
    this.saveMessage(text, 'user');
    this.prompts = [
      { role: 'system', content: systemPrompt.generatePrompt() },
      ...this.fetchMessages()
    ];
  }

  saveMessage(text: string, role: TRole = 'user') {
    this.storage.add(this.chatSettings, removeHashtags(text), role);
  }

  fetchMessages() {
    return this.storage.get(this.chatSettings);
  }

  generate = async () => {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: this.prompts,
        temperature: 0.5,
      });
      const response = completion.data.choices[0].message?.content;
      if (!response) return; 

      console.log('response: ', response);
      this.saveMessage(response, 'assistant');
      return response;
    } catch(error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  };
}
