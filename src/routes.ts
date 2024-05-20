import { FastifyInstance } from 'fastify';
import { getItems } from './services/item.service';
import { deductBalance, getBalance } from './services/user.service';

export const routes = async (fastify: FastifyInstance) => {
  fastify.get('/items', async (_, res) => {
    try {
      const items = await getItems();
      res.send(items);
    } catch (err) {
      const error = err as Error;
      res.status(500).send({ error: 'Failed to fetch items', message: error.message });
    }
  });

  fastify.post('/user/balance/:userId', async (req, res) => {
    const { userId } = req.params as { userId: number };
    const { amount } = req.body as { amount: number };
    if (amount < 0) res.status(400).send({ error: `Amount must be mode than 0` })

    try {
      const newBalance = await deductBalance(userId, amount);
      res.send({ userId, newBalance });
    } catch (err) {
      const error = err as Error;
      res.status(400).send({ error: error.message });
    }
  });

  fastify.get('/user/balance/:userId', async (req, res) => {
    const { userId } = req.params as { userId: number };

    try {
      const balance = await getBalance(userId);
      res.send({ userId, balance });
    } catch (err) {
      const error = err as Error;
      res.status(400).send({ error: error.message });
    }
  });

  fastify.get('/ping', async (_, res) => {
    res.send('pong');
  });
};
