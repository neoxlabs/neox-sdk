<p align="center">
  <a href="https://github.com/neoxlabs/neox"><img src="https://raw.githubusercontent.com/neoxlabs/neox/main/docs/assets/mark.png" alt="NeoX" width="72"></a>
</p>

# @mk-co/neox-sdk

**Neox Agent SDK** — BYOK providers, tools, streaming, sessions.

```bash
npm install @mk-co/neox-sdk zod
```

## Download & run

```bash
git clone https://github.com/neoxlabs/neox-sdk-starter.git
cd neox-sdk-starter
npm install
npm run mock    # offline, no API key
# cp .env.example .env  # set one key
npm run hello
```

Starter: https://github.com/neoxlabs/neox-sdk-starter

## Docs (use cases)

- https://neox-dev.com/developers
- https://neox-dev.com/developers/use-cases
- https://neox-dev.com/developers/quickstart

## Hello

```ts
import { Agent } from '@mk-co/neox-sdk';

const agent = new Agent({ model: 'claude-sonnet-4-6' });
console.log((await agent.run('What is 2 + 2?')).text);
```

MIT. Runtime ships on npm (`@mk-co/neox-sdk`); this repo is the public entry + examples.
