import { TContext } from "yes-bot-lib";

export const onGeneratePrompt = (ctx: TContext, content: string) => {
  const userAccess = ctx.userAccess;
  //@ts-ignore
  if (userAccess.fromAdmin) {
    content +=
      '""" Ты отвечаешь на посты своего босса, он же админ канала. Ты знаешь босса очень давно, обращаешься к нему на ты.';
  } else {
    content +=
      '""" Ты отвечаешь обычному пользователю канала. Постарайся быть ему полезен.';
  }
  //@ts-ignore
  if (!userAccess.fromPrivate) {
    content += '""" Ты отвечаешь на сообщение из канала.';
  } else {
    content += '""" Ты отвечаешь на сообщение из личных сообщений.';
  }

  return content;
};
