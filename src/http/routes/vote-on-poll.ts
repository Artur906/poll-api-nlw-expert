import { FastifyInstance } from 'fastify';
import z from 'zod';
import { prisma } from '../../lib/prisma';
import { randomUUID } from 'crypto';

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/vote', async (req, res) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    });

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollOptionId } = voteOnPollBody.parse(req.body);
    const { pollId } = voteOnPollParams.parse(req.params);

    let { sessionId } = req.cookies;

    if (sessionId) {
      const userVoteOnPreviousPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId
          }
        }
      })

      if (userVoteOnPreviousPoll && userVoteOnPreviousPoll.pollOptionsId !== pollOptionId) {
        //apaga voto anterior
        await prisma.vote.delete({
          where: {
            id: userVoteOnPreviousPoll.id
          }
        })

      } else if (userVoteOnPreviousPoll) {
        return res.status(400).send({ message: "You already voted on this poll!" })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();

      res.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true
      });
    }


    const vote = await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionsId: pollOptionId
      }
    })


    return res.status(201).send();
  });
}
