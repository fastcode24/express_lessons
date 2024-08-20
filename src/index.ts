import express, { Request, Response } from 'express';
import pino from 'pino';
import todoRouter from './modules/todo/todo.routes';
import { requestDuration } from './libs/middleware';

const DEFAULT_PORT = 3000;

const app = express();
const logger = pino();

app.use(express.json());
app.use(requestDuration);
app.use('/api/todo', todoRouter);

app.get('/', (req: Request, res: Response) => {
  const message = 'Hello!'
  return res.status(200).json(message);
});

const delayedGreatings = () => {
  setTimeout(() => {
    logger.info('Greatings!!');
  }, 1500);
}

app.listen(DEFAULT_PORT, () => {
  logger.info(`Server is running on http://localhost:${DEFAULT_PORT}`);
  delayedGreatings();
})
