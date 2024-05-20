import Fastify from 'fastify';
import { routes } from './routes';
import { config } from './config';

const server = Fastify();

server.register(routes);

const start = async () => {
  try {
    await server.listen({ port: config.PORT });
    console.log(`Server listening at http://localhost:${config.PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
