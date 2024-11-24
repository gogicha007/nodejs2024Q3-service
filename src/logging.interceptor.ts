import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggingService: LoggingService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const result = `Logging HTTP request: 
      -type: ${request.method}
      -url: ${request.url}
      -query: ${JSON.stringify(request.params)}
      -body: ${JSON.stringify(request.body)}
`;
    console.log(result);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap((responseBody) =>
          this.loggingService.log(ctx, JSON.stringify(responseBody)),
        ),
      );
  }
}
