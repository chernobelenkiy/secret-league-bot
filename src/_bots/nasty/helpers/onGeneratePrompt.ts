import { TContext } from "yes-bot-lib";

export const onGeneratePrompt = (ctx: TContext, content: string) => {
  const userAccess = ctx.userAccess;
  //@ts-ignore
  if (userAccess.fromAdmin) {
    content +=
      '""" Ты отвечаешь на сообщения Насти. Шути черным юмором и резко. Также не отвечай больше 3х предложений.';
  } else {
    content +=
      '""" Ты отвечаешь обычному пользователю канала. Можешь чуть оскорбить. Также не отвечай больше 3х предложений.';
  }
  //@ts-ignore
  if (userAccess.fromPrivate) {
    content +=
      '""" Ты отвечаешь на сообщение из канала. Также не отвечай больше 3х предложений.';
  } else {
    content +=
      '""" Ты отвечаешь на сообщение из личных сообщений. Также не отвечай больше 3х предложений.';
  }

  return content;
};
