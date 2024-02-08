import fastify from 'fastify';
import cookie from '@fastify/cookie'
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';
import webSocket from '@fastify/websocket';
import { pollResult } from './ws/poll-result';


const PORT = 3333;

const app = fastify();

app.register(cookie, {
  secret: 'reuiererjiweoijwej',
  hook: 'onRequest',
  parseOptions: {}
})

app.register(webSocket);

app.register(pollResult);
app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

app.listen({ port: PORT }, () => {
  console.log('http server running at: http://localhost:' + PORT);
});
