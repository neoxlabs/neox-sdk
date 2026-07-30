<p align="center">
  <img src="docs/assets/mark.png" alt="NeoX" width="96">
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/neox-white.png">
    <img src="docs/assets/neox-dark.png" alt="neox" width="160">
  </picture>
</p>

<h1 align="center">NeoX Agent SDK</h1>

<p align="center">
  <strong>Build and run agents on the NeoX runtime.</strong><br>
  在 NeoX runtime 上构建与运行 Agent.
</p>

<p align="center">
  <a href="https://github.com/neoxlabs/neox-sdk/stargazers"><img src="https://img.shields.io/github/stars/neoxlabs/neox-sdk?style=social" alt="GitHub stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
</p>

<p align="center">
  <a href="https://neox-dev.com">Website</a> ·
  <a href="https://neox-dev.com/download">Download</a> ·
  <a href="https://neox-dev.com/docs">Docs</a> ·
  <a href="https://github.com/neoxlabs/neox">NeoX</a> ·
  <a href="mailto:support@neox-dev.com">Contact</a>
</p>

---

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
