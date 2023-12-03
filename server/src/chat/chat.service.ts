import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { Msgs } from './entities/msg.entity';
import { UserService } from 'src/user/user.service';
import { MsgDto } from './dtos/msg.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
    @InjectRepository(Msgs) private readonly msgsRepo: Repository<Msgs>,
    private readonly userService: UserService,
  ) {}

  getChats(user: any) {
    return this.chatRepo.find({
      where: [{ recieverId: user.sub }, { senderId: user.sub }],
    });
  }

  async createChat(recieverId: number, user: any) {
    const checkReciver = await this.userService.findOne(recieverId);

    if (!checkReciver || recieverId === user.sub)
      throw new NotFoundException('user not found');

    const chat = this.chatRepo.create({ senderId: user.sub, recieverId });
    console.log(chat);

    return this.chatRepo.save(chat);
  }

  async sendMsg(msgDto: MsgDto, user: any) {
    const checkReciver = await this.userService.findOne(msgDto.reciverId);
    const checkChat = await this.chatRepo.findOne({
      where: [
        { recieverId: msgDto.reciverId, senderId: user.sub },
        { recieverId: user.sub, senderId: msgDto.reciverId },
      ],
    });

    let chat: Chat = checkChat;

    if (!checkChat) chat = await this.createChat(msgDto.reciverId, user);

    if (!checkReciver || msgDto.reciverId === user.sub)
      throw new NotFoundException('not found reciver');

    const msg = this.msgsRepo.create({
      content: msgDto.content,
      senderId: user.sub,
      reciverId: msgDto.reciverId,
      chatId: chat.id,
    });

    console.log(msg);
    return this.msgsRepo.save(msg);
  }

  removeChat(id: number) {
    return this.chatRepo.delete({ id });
  }
}
