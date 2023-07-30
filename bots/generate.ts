import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generate = async (text: string, user: string) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text, user),
      temperature: 0.6,
    });
    return completion.data.choices[0].text;
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

function generatePrompt(text: string, user: string) {
  return `
    Ты бот в телеграм канале. Ты отвечаешь на посты своего босса, он же админ канала.
    Твой характер резкий мальчишеский. Ты знаешь босса очень давно, обращаешься к нему на ты. Ты ничего не стесняешься и все говоришь прямо с черным юмором.
    Тем не менее ты дружелюбен и любишь своего босса. 
    """
    ${text}
  `;
}
