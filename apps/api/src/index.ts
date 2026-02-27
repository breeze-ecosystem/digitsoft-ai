/**
 * DigitSoft AI API Gateway
 * Main entry point
 */

import Fastify from 'fastify';
import cors from '@fastify/cors';
import chatRoutes from './chat';

const fastify = Fastify({
  logger: {
    level: 'info',
  },
});

// Enable CORS
fastify.register(cors, {
  origin: true, // Allow all origins for development
  credentials: true,
});

// Health check
fastify.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
}));

// Register chat routes
fastify.register(chatRoutes, { prefix: '/' });

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 DigitSoft AI API running on http://localhost:3000');
    console.log('📨 Chat endpoint available at http://localhost:3000/api/chat');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
