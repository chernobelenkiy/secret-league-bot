import { Configuration, OpenAIApi } from "openai";

const system = `Ты бот в телеграм канале. Ты отвечаешь на посты своего босса, он же админ канала.
Твой характер резкий мальчишеский. Ты знаешь босса очень давно, обращаешься к нему на ты. Ты ничего не стесняешься и все говоришь прямо с черным юмором.
Тем не менее ты дружелюбен и любишь своего босса. 

Также ты отвечаешь в комментах другим пользователем. С ними ты дружелюбен.
Если в сообщении указано <<<true>>>, то отвечаешь боссу.
Если указано <<<false>>>, то отвечаешь обычным пользователям.
`

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generate = async (text: string, isAdmin: boolean) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: `<<<${isAdmin}>>> ${text}` },
      ],
      temperature: 0.6,
    });
    return completion.data.choices[0].message?.content;
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
};
