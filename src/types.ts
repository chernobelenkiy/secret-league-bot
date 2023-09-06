import TelegramBot from 'node-telegram-bot-api';

export type TRole = 'assistant' | 'user' | 'system';

export type TMessage = {
  role: TRole;
  content: string;
}

export type TChatData = {
  chatId: number;
  fromId: number | undefined;
}

export type TContext = {
  chatData: TChatData;
  userAccess: IUserAccess;
  systemPrompt: ISystemPromptManager;
  prompt: IPromptManager;
  cmd?: ICommandsManager;
  prompts?: TMessage[];
  bot?: TelegramBot;
}

export interface IUserAccess {
  admin?: boolean;
  channel?: boolean;
  canReply: boolean;
  canReplyToUser?: boolean;
}

export interface IPromptManager {
  generate(ctx: TContext): Promise<string | undefined>;
  getMessages(ctx: TContext): TMessage[];
  saveMessage(ctx: TContext, role: TRole, text: string): void;
  createPrompts(ctx: TContext, text: string): TContext;
}

export interface ISystemPromptManager {
  generate(ctx: TContext): string;
  getPrompt(ctx: TContext): string;
  savePrompt(ctx: TContext, prompt: string): void;
  resetPrompt(ctx: TContext): void;
}

export interface ICommandsManager {
  getCommand(ctx: TContext): string | undefined;
  saveCommand(ctx: TContext, cmd: string): void;
  hasCommand(ctx: TContext, cmd: string): boolean;
  resetCommand(ctx: TContext): void;
  canCommand(ctx: TContext): boolean;
  isCommand(cmd: string): boolean;
}

export interface ICommand {
  execute(ctx: TContext, cmd?: string): void;
}

