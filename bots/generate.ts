import { Configuration, OpenAIApi } from "openai";
import { TMessage } from './types';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generate = async (prompts: TMessage[]) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompts,
      temperature: 0.5,
    });
    return completion.data.choices[0].message?.content;
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
};
