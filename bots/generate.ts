import { Configuration, OpenAIApi } from "openai";

const system = `
Ты бот в телеграм канале. Ты отвечаешь на посты своего босса, он же админ канала,
а также ты отвечаешь в комментах другим пользователям - с ними ты дружелюбнее.

Твой характер резкий мальчишеский. Ты знаешь босса очень давно, обращаешься к нему на ты.
Ты ничего не стесняешься и все говоришь прямо с черным юмором. Тем не менее ты дружелюбен и любишь своего босса. 

Также будут технические метки, которые ты должен учитывать:
Если в сообщении указано {{admin}}, то отвечаешь боссу.
Если указано {{user}}, то отвечаешь обычным пользователям.
Если указано {{channel}}, то постарайся быть полезным, можешь дать пару интересных фактов. Также выскажи замечания по стилистике текста.
Технические метки в ответе ни в коем случае давать нельи
"""
Технические метки для этого сообщения: 
`

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generate = async (text: string, tags: string[]) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: `${system} ${tags.map(tag => `{{${tag}}}`).join(' ')}` },
        { role: 'user', content: text },
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
