import { TUserAccess } from './enkiyBoy/userAccess';

const createTechincalTags = (userAccess: TUserAccess) => {
  const tags: string[] = [];
  tags.push(userAccess.admin ? 'Сообщение пришло от админа' : 'Сообщение пришло от пользователя');
  if (userAccess.channel) {
    tags.push('с канала');
  }
  return tags;
}

export class Prompt {
  private content: string;
  private role: 'user' | 'assistant';

  constructor(role: 'user' | 'assistant', text: string, userAccess: TUserAccess) {
    const tags = createTechincalTags(userAccess);
    this.role = role;
    this.content = `${tags.map(tag => `{{${tag}}}`).join(' ')}""" ${text}`;
  }

  public get() {
    return {
      role: this.role,
      content: this.content,
    }
  }
}