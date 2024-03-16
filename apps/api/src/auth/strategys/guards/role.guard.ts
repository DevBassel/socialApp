import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../decorators/role.decorator';
import { UserService } from '../../../user/user.service';
import { RoleType } from 'src/decorators/enums/Roule.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userServices: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role =
      this.reflector.get(Role, context.getHandler()) || Object.keys(RoleType);
    const { sub } = context.switchToHttp().getRequest().user;
    const user = await this.userServices.findOne(sub);
    console.log(user);

    if (user) {
      return role.includes(user.role);
    }

    return false;
  }
}
