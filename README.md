# Neox Agent SDK

Embed NeoX’s production agent engine in TypeScript.

```ts
import { Agent } from '@mk-co/neox-sdk'

const agent = new Agent({ model: 'claude-sonnet-4-6' })
console.log((await agent.run('What is 2 + 2?')).text)
```

<p>
  <a href="https://neox-dev.com/sdk"><img src="https://img.shields.io/badge/Docs-neox--dev.com%2Fsdk-0ea5e9?style=flat-square" alt="Docs" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="MIT" /></a>
  <a href="https://github.com/neoxlabs/neox"><img src="https://img.shields.io/badge/NeoX-Workstation-111827?style=flat-square" alt="NeoX" /></a>
</p>

## Install

```bash
npm install @mk-co/neox-sdk zod
```

Requires Node.js 20+.

## API

| Export | Role |
|--------|------|
| `Agent` | `run()` / `stream()` / `abort()` |
| `tool()` | Zod schema → JSON Schema tools |
| `provider` / `providerFromEnv` | Multi-provider configuration |
| `createSession` / `Session` | Session helpers |
| `@mk-co/neox-sdk/testing` | `mockLlm` / replay for offline tests |

Events include `text_delta`, `tool_call`, `tool_result`, `thinking`, `done`, and `error`.

## Tools

```ts
import { Agent, tool } from '@mk-co/neox-sdk'
import { z } from 'zod'

const weather = tool({
  name: 'get_weather',
  description: 'Get weather for a city',
  schema: z.object({ city: z.string() }),
  handler: async ({ city }) => ({ temp: 22, city }),
})

const agent = new Agent({ model: 'claude-sonnet-4-6', tools: [weather] })
for await (const ev of agent.stream('Weather in Tokyo?')) {
  if (ev.type === 'text_delta') process.stdout.write(ev.delta)
}
```

## Design

The SDK drives the same `StreamedRunner` engine used by NeoX Desktop and CLI. It does not load Desktop UI, product memory, or cloud billing paths into your process.

Examples: [`examples/`](./examples/) · Overview: [neoxlabs/neox](https://github.com/neoxlabs/neox)

## License

[MIT](./LICENSE) © Neox Labs
