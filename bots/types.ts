import TelegramBot from 'node-telegram-bot-api';

export type TRole = 'assistant' | 'user' | 'system';

export type TMessage = {
  role: TRole;
  content: string;
}

export type TChatSettings = {
  chatId: number;
  fromId: number | undefined;
}

export type TContext = {
  settings: TChatSettings;
  systemPrompt: ISystemPrompt;
  cmd: ICommandsManager;
  bot: TelegramBot;
}

export interface ISystemPrompt {
  generatePrompt(): string;
  getPrompt(): string;
  savePrompt(prompt: string): void;
  resetPrompt(): void;
}

export interface ICommandsManager {
  command(ctx?: TContext): void;
  getCommand(): string | undefined;
  saveCommand(cmd: string): void;
  hasCommand(cmd: string): boolean;
  resetCommand(): void;
}

export interface ICommand {
  execute(ctx: TContext, cmd?: string): void;
}

