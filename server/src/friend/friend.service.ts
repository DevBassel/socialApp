import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend, Status } from './entities/friend.entity';
import { Repository } from 'typeorm';
import { StatusType } from './dto/statusType.enum';
import { Notification } from 'src/notification/entities/notification.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend) private readonly friendRepo: Repository<Friend>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Notification)
    private readonly notifyRepo: Repository<Notification>,
  ) {}
  async create(userId: number, user: any) {
    const friendShip: Friend = this.friendRepo.create({
      senderId: user.sub,
      reciverId: userId,
    });

    const checkFriendShip = await this.friendRepo.findOne({
      where: [
        { senderId: user.sub, reciverId: userId },
        { reciverId: user.sub, senderId: userId },
      ],
    });

    if (checkFriendShip || friendShip.senderId === friendShip.reciverId)
      throw new BadRequestException();

    const fromUser: User = await this.userRepo.findOneBy({ id: user.sub });

    const notification = this.notifyRepo.create({
      content: `you have a new friend request from ${fromUser.name}?`,
      from: fromUser,
      toId: userId,
    });

    this.notifyRepo.save(notification);

    return this.friendRepo.save(friendShip);
  }

  findAll(user: any) {
    return this.friendRepo.find({
      where: [{ senderId: user.sub }],
    });
  }

  async getMyFriends(user: any) {
    const friends = await this.friendRepo.find({
      where: [
        { reciverId: user.sub, status: Status.ACCEPT },
        {
          senderId: user.sub,
          status: Status.ACCEPT,
        },
      ],
      relations: {
        sender: true,
        reciver: true,
      },
    });

    return friends;
  }

  async accept(reqId: number, statusType: StatusType, user: any) {
    const checkFriendShip = await this.friendRepo.findOne({
      where: {
        id: reqId,
        reciverId: user.sub,
      },
      relations: {
        reciver: true,
      },
    });
    if (!checkFriendShip) throw new NotFoundException();

    if (checkFriendShip.status !== Status.PENDING)
      throw new BadRequestException();

    if (
      statusType === StatusType.accept &&
      checkFriendShip.status === Status.PENDING
    ) {
      const notification = this.notifyRepo.create({
        content: `${checkFriendShip.reciver.name} accept your friend request ^_^`,
        from: checkFriendShip.reciver,
        toId: checkFriendShip.senderId,
      });
      this.notifyRepo.save(notification);

      console.log(notification);

      this.friendRepo.save({
        ...checkFriendShip,
        status: Status.ACCEPT,
      });
      return {
        success: true,
      };
    }

    if (
      statusType === StatusType.reject &&
      checkFriendShip.status === Status.PENDING
    ) {
      return this.friendRepo.save({
        ...checkFriendShip,
        status: Status.CANCEL,
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
