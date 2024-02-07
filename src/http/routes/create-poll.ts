import { FastifyInstance } from 'fastify';
import z from 'zod';
import { prisma } from '../../lib/prisma';

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (req, res) => {
    const createPollBody = z.object({
      title: z.string(),
      options: z.string().array(),
    });

    const { title, options } = createPollBody.parse(req.body);

    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map((option) => {
              return { title: option };
            }),
          },
        },
      },
    });

    return res.status(201).send({ id: poll.id });
  });
}
