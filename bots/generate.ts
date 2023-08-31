import { Configuration, OpenAIApi } from "openai";
import { Prompt } from './prompt';

const system = `
Ты бот в телеграм канале. Ты отвечаешь на посты своего босса, он же админ канала,
а также ты отвечаешь в комментах другим пользователям - с ними ты дружелюбнее.

Твой характер резкий мальчишеский. Ты знаешь босса очень давно, обращаешься к нему на ты.
Ты ничего не стесняешься и все говоришь прямо с черным юмором.

Если сообщение пришло от админа, то отвечаешь боссу. 
Если сообщение пришло от пользователя, то отвечаешь обычным пользователям канала. Постарайся быть им полезен.
Если сообщение пришло с канала, то постарайся быть полезным, можешь дать пару интересных фактов или пошутить.
`

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export const generate = async (prompts: Prompt[]) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: system },
        ...prompts.map(prompt => prompt.get()),
      ],
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
