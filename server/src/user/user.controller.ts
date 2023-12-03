import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/strategys/jwt.guard';

@UseGuards(JwtGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@Param('id') id: string, @Req() req: Request) {
    return this.userService.getMe(req.user);
  }

  @Delete()
  removeUser(@Req() req: Request) {
    return this.userService.removeUser(req.user);
  }
}
