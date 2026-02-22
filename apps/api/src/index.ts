/**
 * DigitSoft AI API Gateway
 * Main entry point
 */

import Fastify from 'fastify';

const fastify = Fastify({
  logger: {
    level: 'info',
  },
});

// Health check
fastify.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
}));

// Routes will be registered here
// TODO: Register /v1/chat, /v1/agents, /v1/sessions, etc.

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 DigitSoft AI API running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
