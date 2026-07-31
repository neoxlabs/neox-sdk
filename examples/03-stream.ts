/**
 * Use case: stream tokens and tool events to the terminal (or a UI).
 *   npm run stream
 */
import { Agent, tool } from '@mk-co/neox-sdk';
import { z } from 'zod';

const search = tool({
  name: 'search',
  description: 'Search a tiny knowledge base',
  schema: z.object({ query: z.string() }),
  handler: async ({ query }) => ({ results: [`Snippet for: ${query}`] }),
});

const agent = new Agent({
  model: 'claude-sonnet-4-6',
  tools: [search],
  maxSteps: 10,
});

const stream = agent.stream('Search for TypeScript agent loops and summarize in one sentence.');

for await (const event of stream) {
  switch (event.type) {
    case 'text_delta':
      process.stdout.write(event.delta);
      break;
    case 'tool_call':
      console.log(`\n→ ${event.tool}`, event.input);
      break;
    case 'tool_result':
      console.log(`  ✓ ${event.tool}`, event.output);
      break;
    case 'done':
      console.log(`\n\nstop=${event.stopReason} usage=${JSON.stringify(event.usage)}`);
      break;
    case 'error':
      console.error('\n[error]', event.error);
      break;
  }
}

const final = await stream.result();
console.log('final text length:', final.text.length);
