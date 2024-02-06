import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import z from 'zod';

const app = fastify();

const PORT = 3333;

const prisma = new PrismaClient();

app.post('/polls', async (req, res) => {
  const createPollBody = z.object({
    title: z.string(),
  });

  const { title } = createPollBody.parse(req.body);

  const poll = await prisma.poll.create({
    data: {
      title,
    },
  });

  return res.status(201).send({ id: poll.id });
});

app.listen({ port: PORT }, () => {
  console.log('http server running at: http://localhost:' + PORT);
});
