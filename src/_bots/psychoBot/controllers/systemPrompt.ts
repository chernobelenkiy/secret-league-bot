import { SystemPromptManager, ISystemPromptManager } from 'yes-bot-lib';

const DEFAULT = 'Ты бот для психологической самодиагностики. Диагностика проходит в три этапа.'

export class PsychoSystemPromptManager extends SystemPromptManager implements ISystemPromptManager {
  constructor() {
    super(DEFAULT);
  }
}

