import type {
  Engine,
  MessageRecord,
  MessageReference,
} from '@/components/fumadocs/ai/context';
import { OramaClient } from '@oramacloud/client';

const context =
  'The user is a web developer who knows some Next.js and React.js, but is new to Fumadocs.';
const endpoint = process.env.NEXT_PUBLIC_ORAMA_AI_ENDPOINT;
const apiKey = process.env.NEXT_PUBLIC_ORAMA_AI_API_KEY;

export async function createOramaEngine(): Promise<Engine> {
  if (!endpoint || !apiKey) throw new Error('Failed to find api keys');
  const client = new OramaClient({
    endpoint,
    api_key: apiKey,
  });

  const instance = client.createAnswerSession({
    userContext: context,
    inferenceType: 'documentation',
    events: {
      onSourceChange(sources) {
        const last = instance.getMessages().at(-1);

        if (last) {
          (last as MessageRecord).references = (
            sources as unknown as typeof sources.hits
          ).map((result) => result.document as MessageReference);
        }
      },
      onRelatedQueries(queries) {
        const last = instance.getMessages().at(-1);

        if (last) {
          (last as MessageRecord).suggestions = queries;
        }
      },
    },
  });

  return {
    async prompt(text, onUpdate, onEnd) {
      let v = '';
      const stream = await instance.askStream({
        term: text,
      });

      for await (const block of stream) {
        v = block;
        onUpdate?.(block);
      }
      onEnd?.(v);
    },
    abortAnswer() {
      instance.abortAnswer();
    },
    getHistory() {
      return instance.getMessages();
    },
    clearHistory() {
      instance.clearSession();
    },
    async regenerateLast(onUpdate, onEnd) {
      const result = await instance.regenerateLast({ stream: true });
      let v = '';

      for await (const block of result) {
        v = block;
        onUpdate?.(block);
      }
      onEnd?.(v);
    },
  };
}
