import { TUserAccess } from './userAccess';
import { ISystemPrompt } from '../types';

const systemPrompt = 'Ты бот для психологической самодиагностики. Диагностика проходит в три этапа.'

export class SystemPrompt implements ISystemPrompt {
  private userAccess: TUserAccess;

  constructor(userAccess: TUserAccess) {
    this.userAccess = userAccess;
  }

  generatePrompt() {
    return systemPrompt;
  }
}

