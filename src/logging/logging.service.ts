import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { MAX_LOG_LEVEL, DEFAULT_LOG_LEVEL, LOG_LEVELS } from 'src/app.const';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor(context?: string) {
    super(context);
    this.setLogLevels(
      LoggingService.getLogLevel(
        (process.env.LOG_LEVEL ?? DEFAULT_LOG_LEVEL) as string,
      ),
    );
  }

  async logToFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Chicago',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string) {
    const entry = `log: ${context ? context : ''}\t${message}`;
    this.logToFile(entry)
    super.log(message, context);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, stackOrContext?: string) {
    const entry = `error: ${stackOrContext ? stackOrContext : ''}\t${message}`;
    this.logToFile(entry)
    super.error(message, stackOrContext);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any) {
    console.log('warn gogicha', message);
    super.warn(message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any) {
    console.log('debug gogicha', message);
    super.warn(message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any) {
    console.log('verbose gogicha', message);
    super.verbose(message);
  }

  static objectToString(object: unknown): string {
    return Object.keys(object).reduce(
      (result, param, index) =>
        `${result}${param}: ${object[param]}${
          Object.keys(object).length - 1 === index ? ' }' : ', '
        }`,
      '{ ',
    );
  }

  static getLogLevel(level: string): LogLevel[] {
    if (+level > MAX_LOG_LEVEL) {
      throw new Error('Invalid log level argument');
    }

    return LOG_LEVELS.slice(0, +level);
  }
}
