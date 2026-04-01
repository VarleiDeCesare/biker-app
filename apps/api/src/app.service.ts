import { Injectable } from '@nestjs/common';
import { APP_NAME } from '@biker-app/shared';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello from ${APP_NAME} API!`;
  }
}
