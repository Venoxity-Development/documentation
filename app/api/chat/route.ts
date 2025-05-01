import { systemPrompt } from '@/lib/chat/prompts';
import { ProvideLinksToolSchema } from '../../../lib/chat/inkeep-qa-schema';
import { createOpenAI } from '@ai-sdk/openai';
import {
  InvalidToolArgumentsError,
  Message,
  NoSuchToolError,
  smoothStream,
  streamText,
  tool,
  ToolExecutionError,
} from 'ai';

export const runtime = 'edge';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const {
    messages,
  }: {
    messages: Array<Message>;
  } = await request.json();

  const result = streamText({
    model: openai.responses('gpt-4.1-mini'),
    system: systemPrompt,
    tools: {
      provideLinks: tool({
        description: "Provide links to articles found using the Web Search tool. This is compulsory and MUST be called after a web search, as it gives the user context on which URLs were used to generate the response.",
        parameters: ProvideLinksToolSchema,
        execute: async ({ links }) => ({
          links
        }),
      }),
      webSearch: openai.tools.webSearchPreview(),
    },
    messages,
    toolChoice: 'auto',
    maxSteps: 10,
    experimental_transform: [
      smoothStream({
        chunking: 'word',
      }),
    ],
    onStepFinish: async ({ toolResults }) => {
      console.log(`Step Results: ${JSON.stringify(toolResults, null, 2)}`);
    }
  });
  
  return result.toDataStreamResponse({
    getErrorMessage: (error) => {
      console.log('An error occurred: ', JSON.stringify(error));

      if (NoSuchToolError.isInstance(error)) {
        return 'The model tried to call a unknown tool.';
      } else if (InvalidToolArgumentsError.isInstance(error)) {
        return 'The model called a tool with invalid arguments.';
      } else if (ToolExecutionError.isInstance(error)) {
        return 'An error occurred during tool execution.';
      } else {
        return 'An unknown error occurred.';
      }
    },
  });
}
