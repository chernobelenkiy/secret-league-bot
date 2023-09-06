import { SystemPromptManager } from '../../../controllers/systemPrompt';
import { ISystemPromptManager, TContext } from '../../../types';

const DEFAULT = 'Ты бот для психологической самодиагностики. Диагностика проходит в три этапа.'

export class PsychoSystemPromptManager extends SystemPromptManager implements ISystemPromptManager {
  constructor() {
    super(DEFAULT);
  }
}

