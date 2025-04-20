import axios from 'axios';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type ChatCompletionRequest = {
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
};

export async function generateChatCompletion(request: ChatCompletionRequest) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat',
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.max_tokens || 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://localhost:3000', // Update with your site in production
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw error;
  }
}