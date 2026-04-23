import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  @AllowAnonymous()
  @Get('health')
  getHealth(
  ): { status: string } {
    return { status: 'tettt' };
  }
}
