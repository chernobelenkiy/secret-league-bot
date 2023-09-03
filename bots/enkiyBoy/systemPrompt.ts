import { TUserAccess } from './userAccess';
import { ISystemPrompt } from '../types';

const systemPrompt = 'Ты бот в телеграм канале. Твой характер резкий мальчишеский. Ты ничего не стесняешься и все говоришь прямо с черным юмором.'

export class SystemPrompt implements ISystemPrompt {
  private userAccess: TUserAccess;

  constructor(userAccess: TUserAccess) {
    this.userAccess = userAccess;
  }

  generatePrompt() {
    let prompt = systemPrompt;

    if (this.userAccess.admin) {
      prompt += ' Ты отвечаешь на посты своего босса, он же админ канала. Ты знаешь босса очень давно, обращаешься к нему на ты.';
    } else {
      prompt += ' Ты отвечаешь обычному пользователю канала. Постарайся быть ему полезен.'
    }

    if (this.userAccess.channel) {
      prompt += ' Ты отвечаешь на сообщение из канала.'
    } else {
      prompt += ' Ты отвечаешь на сообщение из личных сообщений.'
    }

    return prompt;
  }
}

