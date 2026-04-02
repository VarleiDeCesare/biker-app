import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { auth } from '../../lib/auth';

type CurrentUserType = typeof auth.$Infer.Session.user;

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserType => {
    const request = ctx.switchToHttp().getRequest<{ user: CurrentUserType }>();
    return request.user;
  },
);
