import { Reflector } from '@nestjs/core';
import { RoleType } from '../user/enums/Roule.enum';

export const Role = Reflector.createDecorator<RoleType[]>();
