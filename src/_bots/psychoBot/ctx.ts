import TelegramBot from 'node-telegram-bot-api';
import { TContext } from '../../types';
import { PromptManager } from '../../controllers/prompt';
import { PsychoCommandsManager } from './controllers/commands';
import { PsychoSystemPromptManager } from './controllers/systemPrompt';
import { createUserAccess } from './helpers';

export const createContext = (msg: TelegramBot.Message, bot: TelegramBot): TContext => ({
  chatData: {
    chatId: msg.chat.id,
    fromId: msg.from?.id
  },
  bot,
  userAccess: createUserAccess(msg),
  cmd: new PsychoCommandsManager(),
  systemPrompt: new PsychoSystemPromptManager(),
  prompt: new PromptManager()
});

