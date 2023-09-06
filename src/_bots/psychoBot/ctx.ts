import TelegramBot from 'node-telegram-bot-api';
import { TContext } from '../../types';
import { PromptManager } from '../../controllers/prompt';
import { PsychoCommandsManager } from './controllers/cmd';
import { PsychoSystemPromptManager } from './controllers/systemPrompt';
import { createUserAccess } from './helpers';

export const createContext = (msg: TelegramBot.Message, bot: TelegramBot): TContext => ({
  data: {
    chatId: msg.chat.id,
    fromId: msg.from?.id,
    text: msg.text || '',
  },
  bot,
  prompts: [],
  userAccess: createUserAccess(msg),
  cmd: new PsychoCommandsManager(),
  systemPrompt: new PsychoSystemPromptManager(),
  prompt: new PromptManager()
});

