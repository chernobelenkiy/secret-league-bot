import { SystemPromptManager } from '../../../controllers/systemPrompt';
import { ISystemPromptManager, TContext } from '../../../types';

const DEFAULT = 'Ты бот в телеграм канале. Твой характер резкий мальчишеский. Ты ничего не стесняешься и все говоришь прямо с черным юмором.'

export class EnkiySystemPrompt extends SystemPromptManager implements ISystemPromptManager {
  constructor() {
    super(DEFAULT);
  }

  generate(ctx: TContext) {
    let prompt = this.getPrompt(ctx);

    if (ctx.userAccess.admin) {
      prompt += ' Ты отвечаешь на посты своего босса, он же админ канала. Ты знаешь босса очень давно, обращаешься к нему на ты.';
    } else {
      prompt += ' Ты отвечаешь обычному пользователю канала. Постарайся быть ему полезен.'
    }

    if (ctx.userAccess.channel) {
      prompt += ' Ты отвечаешь на сообщение из канала.'
    } else {
      prompt += ' Ты отвечаешь на сообщение из личных сообщений.'
    }

    return prompt;
  }
}

