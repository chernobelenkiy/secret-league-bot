import { PromptManager } from '../prompt';
import { TMessage } from '../types';
import { TUserAccess } from '../enkiyBoy/userAccess';

describe('Prompt', () => {
  let userAccess: TUserAccess;

  beforeEach(() => {
    userAccess = {
      adminUser: false,
      whiteListUser: false,
      adminChat: false,
      channel: false,
      admin: false,
      canReply: true,
      canReplyToUser: false,
      message: '',
      hashTags: {},
    }
  });


  describe('constructor', () => {
    it('should create a prompt with the correct content for a user', () => {
      userAccess.admin = false;
      userAccess.channel = true;
      const messages: TMessage[] = [ { role: 'user', content: 'hello world' } ];
      const prompts = new PromptManager(userAccess, messages).getPrompts();

      expect(prompts[0].content).toEqual('Ты бот в телеграм канале. Твой характер резкий мальчишеский. Ты ничего не стесняешься и все говоришь прямо с черным юмором. Ты отвечаешь обычному пользователю канала. Постарайся быть ему полезен. Ты отвечаешь на сообщение из канала.')
    });

    it('should create a prompt with the correct content for an admin', () => {
      userAccess.admin = true;
      userAccess.channel = true;
      const messages: TMessage[] = [ { role: 'user', content: 'hello world' } ];
      const prompts = new PromptManager(userAccess, messages).getPrompts();

      expect(prompts[0].content).toEqual('Ты бот в телеграм канале. Твой характер резкий мальчишеский. Ты ничего не стесняешься и все говоришь прямо с черным юмором. Ты отвечаешь на посты своего босса, он же админ канала. Ты знаешь босса очень давно, обращаешься к нему на ты. Ты отвечаешь на сообщение из канала.');
    });

    it('should create a prompt with the correct content for a user without a channel', () => {
      userAccess.admin = false;
      userAccess.channel = false;
      const messages: TMessage[] = [ { role: 'user', content: 'hello world' } ];
      const prompts = new PromptManager(userAccess, messages).getPrompts();

      expect(prompts[0].content).toEqual('Ты бот в телеграм канале. Твой характер резкий мальчишеский. Ты ничего не стесняешься и все говоришь прямо с черным юмором. Ты отвечаешь обычному пользователю канала. Постарайся быть ему полезен. Ты отвечаешь на сообщение из личных сообщений.');
    });
  });
});