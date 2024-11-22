import { ConsoleLogger } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { MAX_LOG_LEVEL, DEFAULT_LOG_LEVEL, LOG_LEVELS } from 'src/app.const';

export class LoggingService extends ConsoleLogger {
  constructor(context?: string) {
    super(context);

    this.setLogLevels(
      LoggingService.getLogLevel(
        (process.env.LOG_LEVEL ?? DEFAULT_LOG_LEVEL) as string,
      ),
    );
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any) {
    console.log('log gogicha',message)
    super.log(message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any) {
    console.log('error gogicha', message)
    super.error(message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any) {
    console.log('warn gogicha', message)
    super.warn(message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any) {
    console.log('debug gogicha', message)
    super.warn(message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any) {
    console.log('verbose gogicha', message)
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
