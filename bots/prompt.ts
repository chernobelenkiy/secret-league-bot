import TelegramBot from 'node-telegram-bot-api';
import { Configuration, OpenAIApi } from 'openai';
import { MessageStorageManager } from './storage';
import { removeHashtags } from './hashTags';
import { TMessage, ISystemPrompt, TRole, TChatSettings } from './types';

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

  constructor(systemPrompt: ISystemPrompt, msg: TelegramBot.Message) {
    this.saveMessage(msg.chat.id, msg.from?.id, msg.text, 'user');
    this.chatSettings = { chatId: msg.chat.id, fromId: msg.from?.id };
    this.prompts = [
      { role: 'system', content: systemPrompt.generatePrompt() },
      ...this.fetchMessages()
    ];
  }

  saveMessage(chatId: number, fromId: number | undefined, text: string, role: TRole = 'user') {
    this.storage.add(chatId, fromId, removeHashtags(text), role);
  }

  fetchMessages() {
    return this.storage.get(this.chatSettings.chatId, this.chatSettings.fromId);
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
      this.saveMessage(this.chatSettings.chatId, this.chatSettings.fromId, response, 'assistant');
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
