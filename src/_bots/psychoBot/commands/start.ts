import { ICommand, TContext } from '../../../types';
import { EPayloads } from '../types';

export class StartCommand implements ICommand {
  execute(ctx: TContext) {
    ctx.bot.sendMessage(ctx.data.chatId, 'Выбери из меню', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Добавить системный промпт', callback_data: EPayloads.prompt },
            { text: 'Сбросить', callback_data: EPayloads.reset },
          ],
        ],
      },
    });
  }
}
