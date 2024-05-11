import { YesBot, YesBotConfig } from "yes-bot-lib";
import { onGeneratePrompt, onMessage, onCreateUserAccess } from "./helpers";

if (!process.env.ENKIY_KEY) {
  throw new Error("Telegram API key is needed");
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OpenAI API key is needed");
}

if (!process.env.ENKIY_THREAD_ID) {
  throw new Error("OpenAI thread ID is needed");
}

if (!process.env.ENKIT_ASSISTANT_ID) {
  throw new Error("OpenAi Assistant ID is needed");
}

const config: YesBotConfig = {
  keys: {
    telegram: process.env.ENKIY_KEY,
    openai: process.env.OPENAI_API_KEY,
  },
  commands: [],
  callbacks: {
    onGeneratePrompt,
    onMessage,
    onUserAccess: onCreateUserAccess,
  },
  openai: {
    threadId: process.env.ENKIY_THREAD_ID,
    assistantId: process.env.ENKIT_ASSISTANT_ID,
  },
};

const bot = new YesBot(config);
bot.start();
