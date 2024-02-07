import fastify from 'fastify';
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';


const PORT = 3333;

const app = fastify();

app.register(createPoll);
app.register(getPoll);

app.listen({ port: PORT }, () => {
  console.log('http server running at: http://localhost:' + PORT);
});
