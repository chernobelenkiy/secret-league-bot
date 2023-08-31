import { TUserAccess } from './enkiyBoy/userAccess';
import { TMessage } from './types';

const systemPrompt = 'Ты бот в телеграм канале. Твой характер резкий мальчишеский. Ты ничего не стесняешься и все говоришь прямо с черным юмором.'

export class PromptManager {
  private userAccess: TUserAccess;
  private prompts: TMessage[] = [];

  constructor(userAccess: TUserAccess, messages: TMessage[]) {
    this.userAccess = userAccess;
    this.prompts = [
      { role: 'system', content: this.createSystemPrompt() },
      ...messages
    ];
  }

  createSystemPrompt() {
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

  getPrompts(): TMessage[] {
    return this.prompts;
  }
}
