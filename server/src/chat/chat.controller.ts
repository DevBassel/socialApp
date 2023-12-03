import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Post,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/strategys/jwt.guard';
import { MsgDto } from './dtos/msg.dto';

@UseGuards(JwtGuard)
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get()
  chats(@Req() req: Request, @Ip() ip: any) {
    console.log(ip);
    return this.chatService.getChats(req.user);
  }

  @Post()
  create(@Req() req: Request, @Body('reciverId') reciverId: string) {
    return this.chatService.createChat(+reciverId, req.user);
  }

  @Post('msgs')
  sendMsg(@Req() req: Request, @Body() msgDto: MsgDto) {
    return this.chatService.sendMsg(msgDto, req.user);
  }

  @Delete()
  removeChat(@Body('chatId', ParseIntPipe) id: number) {
    return this.chatService.removeChat(id);
  }
}
