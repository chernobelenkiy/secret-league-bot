import { TUserAccess } from './userAccess';
import { ISystemPrompt } from '../types';

const systemPrompt = 'Ты бот в телеграм канале. Твой характер резкий мальчишеский. Ты ничего не стесняешься и все говоришь прямо с черным юмором.'

export class SystemPrompt implements ISystemPrompt {
  private userAccess: TUserAccess;

  constructor(userAccess: TUserAccess) {
    this.userAccess = userAccess;
  }

  generatePrompt() {
    return systemPrompt;
  }
}

