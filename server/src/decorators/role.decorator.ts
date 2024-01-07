import { Reflector } from '@nestjs/core';
import { RoleType } from 'src/user/enums/Roule.enum';

export const Role = Reflector.createDecorator<RoleType[]>();
