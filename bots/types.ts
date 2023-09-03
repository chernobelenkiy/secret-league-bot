
export type TRole = 'assistant' | 'user' | 'system';

export type TMessage = {
  role: TRole;
  content: string;
}

export interface ISystemPrompt {
  generatePrompt(): string;
}
