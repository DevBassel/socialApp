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
  Patch,
  Param,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/strategys/jwt.guard';
import { MsgDto } from './dtos/msg.dto';
import { UpdateMsgDto } from './dtos/updateMsgDto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateChatDto } from './dtos/createChat.dto';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Chat')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // get user chats
  @Get()
  chats(@Req() req: Request, @Ip() ip: any) {
    console.log(ip);
    return this.chatService.getChats(req.user);
  }

  // create new chat
  @Post()
  create(@Req() req: Request, @Body() payload: CreateChatDto) {
    return this.chatService.createChat(payload.reciverId, req.user);
  }

  @Delete(':chatId')
  removeChat(@Param('chatId', ParseIntPipe) id: number) {
    return this.chatService.removeChat(id);
  }

  // get chat msgs
  @Get('msgs/:chatid')
  getMsgs(@Param('chatid', ParseIntPipe) chatId: number) {
    return this.chatService.getMsgs(chatId);
  }

  // send msg
  @Post('msgs')
  sendMsg(@Req() req: Request, @Body() msgDto: MsgDto) {
    return this.chatService.sendMsg(msgDto, req.user);
  }

  // update msg
  @Patch('msgs')
  updateMsg(@Body() payload: UpdateMsgDto, @Req() req: Request) {
    return this.chatService.updateMsg(payload, req.user);
  }

  @Delete('msgs/:msgId')
  removeMsg(@Param('msgId', ParseIntPipe) msgId: number, @Req() req: Request) {
    return this.chatService.removeMsg(msgId, req.user);
  }
}
