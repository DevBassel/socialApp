import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/decorators/role.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userServices: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get(Role, context.getHandler());
    const { sub } = context.switchToHttp().getRequest().user;
    const user = await this.userServices.findOne(sub);
    console.log(user);

    if (user) {
      return role.includes(user.role);
    }

    return false;
  }
}
