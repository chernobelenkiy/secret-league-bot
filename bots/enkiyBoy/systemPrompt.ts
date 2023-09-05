import TelegramBot from 'node-telegram-bot-api';
import { SystemPrompt } from '../systemPrompt';
import { ISystemPrompt, TChatSettings } from '../types';
import { TUserAccess } from './userAccess';

const DEFAULT = 'Ты бот в телеграм канале. Твой характер резкий мальчишеский. Ты ничего не стесняешься и все говоришь прямо с черным юмором.'

export class EnkiySystemPrompt extends SystemPrompt implements ISystemPrompt {
  private userAccess: TUserAccess;

  constructor(chatSettings: TChatSettings, userAccess: TUserAccess) {
    super(DEFAULT, chatSettings);
    this.userAccess = userAccess;
  }

  generatePrompt() {
    let prompt = this.getPrompt();

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

