import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  ParseEnumPipe,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { JwtGuard } from 'src/auth/strategys/jwt.guard';
import { Request } from 'express';
import { StatusType } from './dto/statusType.enum';

@UseGuards(JwtGuard)
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post()
  create(@Body('user_Id', ParseIntPipe) userId: number, @Req() req: Request) {
    return this.friendService.create(userId, req.user);
  }

  @Get()
  getMyFriends(@Req() req: Request) {
    return this.friendService.getMyFriends(req.user);
  }

  @Post(':type')
  accept(
    @Body('requestId', ParseIntPipe) reqId: number,
    @Param('type', new ParseEnumPipe(StatusType)) statusType: StatusType,
    @Req() req: Request,
  ) {
    return this.friendService.accept(reqId, statusType, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendService.remove(+id);
  }
}
