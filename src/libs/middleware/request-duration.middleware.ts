import { Request, Response, NextFunction } from 'express';
import pino from 'pino';

const logger = pino();

export const requestDuration = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });

  next();
}
