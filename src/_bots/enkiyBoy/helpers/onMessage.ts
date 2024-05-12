import { TContext } from "yes-bot-lib";

export const onMessage = async (ctx: TContext) => {
  console.log(ctx);
  if (ctx.userAccess.canReply && ctx.data.msg) {
    const response = await ctx.prompt.generate(ctx, ctx.data.msg?.text || "");
    if (!response) return;
    await ctx.bot.sendMessage(ctx.data.msg, response);
  }
};
