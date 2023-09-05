import TelegramBot from 'node-telegram-bot-api';
import { SystemPrompt } from '../systemPrompt';
import { ISystemPrompt, TChatSettings } from '../types';

const DEFAULT = 'Ты бот для психологической самодиагностики. Диагностика проходит в три этапа.'

export class PsychoSystemPrompt extends SystemPrompt implements ISystemPrompt {
  
  constructor(chatSettings: TChatSettings) {
    super(DEFAULT, chatSettings);
  }

  generatePrompt() {
    return this.getPrompt();
  }
}

