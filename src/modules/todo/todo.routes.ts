import { Router, Request, Response } from 'express';
import pino from 'pino';
import { TodoSQLiteRepository } from './repository/todo-sqlite.repository';
import { Task } from '../../libs/types';
import { filterByProperty } from '../../libs/helpers';

const logger = pino();
const todoRepository = new TodoSQLiteRepository();
const todoRouter = Router();

todoRouter.get('/tasks', async (req: Request, res: Response) => {
  const { title, duration } = req.query;
  const tasks = await todoRepository.find();

  if (title) {
    return res.status(200).json(filterByProperty(tasks, 'title', title as string));
  }

  if (duration) {
    return res.status(200).json(filterByProperty(tasks, 'duration', duration as string));
  }

  return res.status(200).json(tasks);
});

todoRouter.post('/tasks', async (req: Request, res: Response) => {
  const { title, description, duration } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask: Task = { title, description, duration };
  const newTaskResponse = await todoRepository.save(newTask);
  return res.status(201).json(newTaskResponse);
});

todoRouter.delete('/tasks/:id', async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id, 10);
  const result = await todoRepository.delete(taskId);
  if (result) {
    return res.status(204).end();
  } else {
    return res.status(404).json({ error: 'Task not found' });
  }
});

export default todoRouter;
