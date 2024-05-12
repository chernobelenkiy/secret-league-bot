import { TContext } from "yes-bot-lib";

export const onGeneratePrompt = (ctx: TContext, content: string) => {
  const userAccess = ctx.userAccess;
  //@ts-ignore
  if (userAccess.fromAdmin) {
    content += '""" Ты отвечаешь на сообщения Насти';
  } else {
    content += '""" Ты отвечаешь обычному пользователю канала.';
  }
  //@ts-ignore
  if (userAccess.fromChannelOrSupergroup) {
    content += '""" Ты отвечаешь на сообщение из канала.';
  } else {
    content += '""" Ты отвечаешь на сообщение из личных сообщений.';
  }

  return content;
};
