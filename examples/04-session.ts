/**
 * Use case: multi-turn chat that survives process restart (Session + checkpointDir).
 *   npm run session
 */
import { createSession } from '@mk-co/neox-sdk';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(process.cwd(), '.checkpoints');
mkdirSync(dir, { recursive: true });

const session = await createSession({
  model: 'claude-sonnet-4-6',
  systemPrompt: 'You are a concise coding assistant. Remember facts the user tells you.',
  checkpointDir: dir,
});

console.log('session id:', session.id);

const r1 = await session.send('My project is called checkout-service. Remember that.');
console.log('\n[turn1]', r1.text);

const r2 = await session.send('What is my project called?');
console.log('\n[turn2]', r2.text);

console.log('\ncheckpoint dir:', dir);
console.log('(restart this script after editing — Session.resume can load from disk; see docs)');
