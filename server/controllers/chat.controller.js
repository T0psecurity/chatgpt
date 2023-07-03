import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

async function generateCompletion(prompt) {
  try {
    const apiUrl = 'https://api.openai.com/v1/completions';
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.5,
      model: 'text-davinci-002'
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const completion = response.data.choices[0].text;
    return completion;

  } catch (error) {
    console.error(error);
  }
}

export const chatCompletion = async (req, res) => {

  const openAIConfig = new Configuration({
    apiKey: process.env.OPENAI_KEY
  });

  // console.log(openAIConfig)
  const openapi = new OpenAIApi(openAIConfig);

  const { prompt } = req.body;

  try {
    const ASSISTANT = { "role": "system", "content": "How You can help me ?" };
    // console.log(openapi)
    const response = await openapi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are a python developer.` },
        {
          role: "assistant",
          content: "python code",
        },
        { role: "user", content: prompt },
      ]

      // messages: [
      //     ASSISTANT,
      //     ...prompt
      // ]
    });
    // console.log(response)
    res.status(200).json({ response: response.data.choices[0].message.content });
  } catch (e) {
    console.log({ e });
  }



  // const { prompt } = req.body;
  // generateCompletion(prompt).then((completion) => {
  //   console.log(completion);
  //   res.status(200).json({ completion });
  // });


  // try {
  //   const { prompt } = req.body;
  //   console.log("sent to open AI:", process.env.OPENAI_KEY);

  //   const answer = await openapi.createCompletion({
  //     model: "text-davinci-002",
  //     prompt: prompt,
  //     temperature: 0.5,
  //     max_tokens: 100
  //   });
  //   const text = answer.data.choices[0].text;
  //   console.log(text,"123123113");
  //   res.status(200).json({ text });
  // } catch (err) {
  //   res.status(500).json({
  //     message: err.message
  //   });
  // }
};







