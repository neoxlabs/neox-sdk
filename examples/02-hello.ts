/**
 * Use case: smallest live agent — one tool + run().
 *   cp .env.example .env   # set ANTHROPIC_API_KEY or OPENAI_API_KEY …
 *   npm run hello
 */
import { Agent, tool, VERSION } from '@mk-co/neox-sdk';
import { z } from 'zod';

console.log(`Neox Agent SDK ${VERSION}`);

const weather = tool({
  name: 'get_weather',
  description: 'Get weather for a city',
  schema: z.object({
    city: z.string().describe('City name in English'),
    unit: z.enum(['celsius', 'fahrenheit']).default('celsius'),
  }),
  handler: async ({ city, unit }) => {
    console.log(`  [tool:weather] city=${city} unit=${unit}`);
    return { temp: 22, unit, city };
  },
});

const agent = new Agent({
  model: 'claude-sonnet-4-6',
  systemPrompt: 'You are a helpful weather assistant. Prefer the get_weather tool.',
  tools: [weather],
  thinking: 'auto',
  maxSteps: 20,
});

const result = await agent.run('What is the weather in Tokyo?');
console.log('\n' + result.text);
console.log('\nusage:', result.usage);
console.log('stopReason:', result.stopReason);
