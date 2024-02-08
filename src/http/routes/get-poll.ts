import { FastifyInstance } from 'fastify';
import z from 'zod';
import { prisma } from '../../lib/prisma';
import { redis } from '../../lib/redis';

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

    if (!poll) return res.status(400).send({ message: 'Poll not found.' })

    const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES')

    const votes = result.reduce((previous, current, index) => {
      if (index % 2 === 0) {
        Object.assign(previous, { [current]: Number(result[index + 1]) })
      }

      return previous;
    }, {} as Record<string, number>)

    console.log("Helooooo", votes)

    return res.status(200).send({
      poll: {
        id: poll.id,
        title: poll.title,
        options: poll.options.map(option => {
          return {
            ...option,
            score: (option.id in votes) ? votes[option.id] : 0
          }
        })
      }
    });
  });
}
