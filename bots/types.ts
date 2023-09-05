
export type TRole = 'assistant' | 'user' | 'system';

export type TMessage = {
  role: TRole;
  content: string;
}

export interface ISystemPrompt {
  generatePrompt(): string;
}

export type TChatSettings = {
  chatId: number;
  fromId: number | undefined;
}

export enum EPayloads {
  prompt = 'prompt',
  reset = 'reset'
}