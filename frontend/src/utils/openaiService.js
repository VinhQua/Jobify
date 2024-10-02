import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getAIResponse = async (input) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
    model: "llama3-8b-8192",
  });
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
  return chatCompletion.choices[0]?.message?.content || "";
};
