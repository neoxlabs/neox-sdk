/**
 * Use case: prove the agent loop works without an API key (CI / first look).
 *   npm run mock
 */
import { Agent } from '@mk-co/neox-sdk';
import { mockLlm } from '@mk-co/neox-sdk/testing';

const agent = new Agent({
  model: 'mock',
  provider: mockLlm({
    responses: [
      { type: 'thinking', content: 'Checking weather…' },
      { type: 'tool_call', tool: 'get_weather', input: { city: 'Tokyo' } },
      { type: 'text', content: "It's 22°C in Tokyo, clear skies." },
    ],
  }),
});

console.log('--- stream (offline) ---');
for await (const event of agent.stream('weather in Tokyo?')) {
  switch (event.type) {
    case 'thinking':
      console.log(`[think] ${event.delta}`);
      break;
    case 'tool_call':
      console.log(`[tool ] ${event.tool}(${JSON.stringify(event.input)})`);
      break;
    case 'text_delta':
      process.stdout.write(event.delta);
      break;
    case 'done':
      console.log(`\n[done] stop=${event.stopReason}`);
      break;
    case 'error':
      console.error('[err ]', event.error);
      break;
  }
}

console.log('\n--- run (offline) ---');
const agent2 = new Agent({
  model: 'mock',
  provider: mockLlm({
    responses: [{ type: 'text', content: 'Hello from mock — no API key used.' }],
  }),
});
console.log((await agent2.run('hi')).text);
