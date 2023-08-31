import { Prompt } from '../prompt';
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
      
      const prompt = new Prompt('user', 'Hello, world!', userAccess);
      expect(prompt.get().content).toEqual('{{Сообщение пришло от пользователя}} {{с канала}}""" Hello, world!');
    });

    it('should create a prompt with the correct content for an admin', () => {
      userAccess.admin = true;
      userAccess.channel = true;
      const prompt = new Prompt('assistant', 'Hello, admin!', userAccess);
      expect(prompt.get().content).toEqual('{{Сообщение пришло от админа}} {{с канала}}""" Hello, admin!');
    });

    it('should create a prompt with the correct content for a user without a channel', () => {
      userAccess.admin = false;
      userAccess.channel = false;
      const prompt = new Prompt('user', 'Hello, world!', userAccess);
      expect(prompt.get().content).toEqual('{{Сообщение пришло от пользователя}}""" Hello, world!');
    });
  });
});