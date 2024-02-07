import { FastifyInstance } from 'fastify';
import z from 'zod';
import { prisma } from '../../lib/prisma';

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (req, res) => {
    const getPollParam = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = getPollParam.parse(req.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId
      },
      include: {
        options: {
          select: {
            title: true,
            id: true
          }
        }
      }
    });



    return res.status(200).send({ poll });
  });
}
