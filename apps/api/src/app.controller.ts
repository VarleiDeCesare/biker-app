import { Body, Controller, Get, Post } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  @AllowAnonymous()
  @Get('health')
  getHealth(): { status: string } {
    return { status: 'tettt' };
  }

  //FIXME: remove it later.
  @Get('test')
  getTest() {
    return { kmTotal: 24380 };
  }

  //FIXME:
  @Post('test-post')
  postTest() {
    return {
      rides: 142,
    };
  }
}
