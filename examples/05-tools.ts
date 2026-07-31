/**
 * Use case: define tools with Zod — no LLM call.
 *   npm run tools
 */
import { tool } from '@mk-co/neox-sdk';
import { z } from 'zod';

const getOrder = tool({
  name: 'get_order',
  description: 'Look up an order by id. Read-only.',
  schema: z.object({
    orderId: z.string().describe('Order id, e.g. A-1024'),
  }),
  readOnly: true,
  handler: async ({ orderId }) => ({
    orderId,
    status: 'shipped',
    total: 42.5,
  }),
});

const refundOrder = tool({
  name: 'refund_order',
  description: 'Refund an order. Money leaves the account.',
  schema: z.object({
    orderId: z.string(),
    reason: z.string().optional(),
  }),
  dangerous: true,
  handler: async ({ orderId, reason }) => ({
    refunded: true,
    orderId,
    reason: reason ?? 'customer_request',
  }),
});

console.log('tools ready:');
console.log(`  - ${getOrder.name} (readOnly=${getOrder.readOnly})`);
console.log(`  - ${refundOrder.name} (dangerous=${refundOrder.dangerous})`);
console.log('\nWire into Agent:');
console.log(`  new Agent({ model, tools: [getOrder, refundOrder] })`);
console.log('See https://neox-dev.com/developers/tools');
