import type { Engine, MessageRecord } from '@/components/fumadocs/ai/context';
import { callChatApi } from '@ai-sdk/ui-utils';
import { generateId } from 'ai';
import type { Message } from "ai";

export async function createAiSdkEngine(): Promise<Engine> {
  let messages: Message[] = [];
  let controller: AbortController | null = null;

  async function fetchStream(
    userMessages: Message[],
    onUpdate?: (full: string) => void,
    onEnd?: (full: string) => void,
  ) {
    controller = new AbortController();

    try {
      let textContent = '';

      await callChatApi({
        api: '/api/chat',
        body: {
          messages: userMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        },
        streamProtocol: 'data',
        credentials: undefined,
        headers: undefined,
        abortController: () => controller,
        restoreMessagesOnFailure() { },
        onResponse: undefined,
        onUpdate({ message }) {
          if (!message) return;
          textContent = message.content;
          onUpdate?.(textContent);
        },
        onToolCall({ toolCall }) {
          console.log('calling tool', toolCall.toolName);
        },
        onFinish(message) {
          onEnd?.(message?.content || '');
        },
        generateId,
        fetch,
        lastMessage: messages[messages.length - 1] ? {
          ...messages[messages.length - 1],
          parts: [],
        } : undefined,
      });

      return textContent;
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        controller = null;
        console.error('Error in AI stream:', error);
        const errorMessage = 'Sorry, an error occurred while generating a response.';
        onEnd?.(errorMessage);
        return errorMessage;
      }
      return '';
    }
  }

  return {
    async prompt(text, onUpdate, onEnd) {
      messages.push({
        id: generateId(),
        role: 'user',
        content: text,
      });

      const response = await fetchStream(messages, onUpdate, onEnd);
      messages.push({
        id: generateId(),
        role: 'assistant',
        content: response,
      });
    },
    async regenerateLast(onUpdate, onEnd) {
      const last = messages.at(-1);
      if (!last || last.role === 'user') {
        return;
      }

      messages.pop();

      const response = await fetchStream(messages, onUpdate, onEnd);
      messages.push({
        id: generateId(),
        role: 'assistant',
        content: response,
      });
    },
    getHistory() {
      return messages
        .filter((msg) => msg.role === 'assistant' || msg.role === 'user')
        .map((msg) => ({
          role: msg.role as MessageRecord['role'],
          content: msg.content,
        }));
    },
    clearHistory() {
      messages = [];
    },
    abortAnswer() {
      controller?.abort();
    },
  };
}
