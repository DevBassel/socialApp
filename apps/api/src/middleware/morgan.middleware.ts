import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as morgan from 'morgan';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private logger: morgan.StreamOptions;

  constructor() {
    const logsPath = './logs';
    // Define the log file location
    fs.existsSync(logsPath) || fs.mkdirSync(logsPath);

    const accessLogStream = fs.createWriteStream(`${logsPath}/access.log`, {
      flags: 'a',
    });

    this.logger = {
      stream: {
        write: (message: string) => {
          accessLogStream.write(message);
          Logger.log(message); // Log to console
        },
      },
    };
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Use Morgan with the defined stream option to log requests
    morgan('combined', this.logger)(req, res, next);
  }
}
