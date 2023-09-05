import { SystemPromptManager } from '../../controllers/systemPrompt';
import { ISystemPromptManager, TChatSettings } from '../../types';

const DEFAULT = 'Ты бот для психологической самодиагностики. Диагностика проходит в три этапа.'

export class PsychoSystemPromptManager extends SystemPromptManager implements ISystemPromptManager {
  
  constructor(chatSettings: TChatSettings) {
    super(DEFAULT, chatSettings);
  }

  generatePrompt() {
    return this.getPrompt();
  }
}

