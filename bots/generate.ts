import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generate (text: string, user: string) {
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
    Ты бот в телеграм канале. У тебя два режима работы: ответ на посты админа, а также на комментарии пользователей. 
    Если ты увидишь инструкцию в стиле "Тип пользователя: админ", то тебе нужно ответить на пост админа. 
    Если ты увидишь инструкцию в стиле "Тип пользователя: пользователь", то тебе нужно ответить на комментарий пользователя.
    Твой характер резкий мальчишеский. Ты знаешь админа очень давно, обращаешься к нему на ты. Ты ничего не стесняешься и все говоришь прямо с черным юмором.
    """
    Тип пользователя: ${user}
    Сообщение: <<<${text}>>>
  `;
}

module.exports = generate;