import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/strategys/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/dto/jwtPayload';

@UseGuards(JwtGuard)
@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll(@Req() req: Request & { user: JwtPayload }) {
    return this.notificationService.findAll(req.user);
  }
}
