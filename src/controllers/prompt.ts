import { Configuration, OpenAIApi } from 'openai';
import { removeHashtags } from '../helpers';
import { TMessage, TRole, TContext, TChatData, IPromptManager } from '../types';

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

  private key({ fromId, chatId }: TChatData) {
    return fromId ? `${chatId}_${fromId}` : chatId.toString();
  }

  public add(data: TChatData, content: string, role: TRole) {
    const key = this.key(data);
    const messages = this.storage.get(key) || new Messages();

    messages.add(content, role);
    this.storage.set(key, messages);
  } 

  public get(data: TChatData): TMessage[] {
    const key = this.key(data);
    const storage = this.storage.get(key) || new Messages();

    return storage.getMessages();
  }

  public reset(data: TChatData): void {
    const key = this.key(data);
    this.storage.delete(key);
  }
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const storage = new MessageStorageManager();

export class PromptManager implements IPromptManager {
  private storage: MessageStorageManager = storage;

  saveMessage(ctx: TContext, role: TRole = 'user', text: string) {
    this.storage.add(ctx.chatData, removeHashtags(text), role);
  }

  getMessages(ctx: TContext) {
    return this.storage.get(ctx.chatData);
  }

  createPrompts(ctx: TContext, text: string) {
    this.saveMessage(ctx, 'user', text);
    return Object.assign(ctx, {
      prompts: [
        { role: 'system', content: ctx.systemPrompt.generate(ctx) },
        ...this.getMessages(ctx)
      ]
    });
  }

  generate = async (ctx: TContext) => {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: ctx.prompts,
        temperature: 0.5,
      });
      const response = completion.data.choices[0].message?.content;
      if (!response) return; 

      console.log('response: ', response);
      this.saveMessage(ctx, 'assistant', response);
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
