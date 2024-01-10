import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend, FriendShipRespons, Status } from './entities/friend.entity';
import { Repository } from 'typeorm';
import { ActionType } from './dto/ActionType.enum';
import { User } from 'src/user/entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend) private readonly friendRepo: Repository<Friend>,
    private readonly notificationServices: NotificationService,
    private readonly userService: UserService,
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

    const fromUser: User = await this.userService.findOne(user.sub);

    this.notificationServices.create({
      content: `you have a new friend request from ${fromUser.name}?`,
      fromId: user.sub,
      toId: userId,
    });

    return this.friendRepo.save(friendShip);
  }

  findAll(user: any) {
    return this.friendRepo.find({
      where: [{ senderId: user.sub }],
    });
  }
  getMyRequsets(user: any) {
    return this.friendRepo.find({
      where: [
        {
          reciverId: user.sub,
          status: Status.PENDING,
        },
        {
          senderId: user.sub,
          status: Status.PENDING,
        },
      ],
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

    const myFriends = friends.map((friend) => {
      const { sender, reciver, ...other } = friend;

      if (sender.id === user.sub) {
        return { ...other, user: reciver };
      } else {
        return { ...other, user: sender };
      }
    });

    return myFriends.map((friend) => new FriendShipRespons(friend));
  }

  async action(reqId: number, actionType: ActionType, user: any) {
    const checkFriendShip = await this.friendRepo.findOne({
      where: [
        {
          id: reqId,
          reciverId: user.sub,
        },
        {
          id: reqId,
          senderId: user.sub,
        },
      ],
      relations: {
        reciver: true,
      },
    });
    if (!checkFriendShip) throw new NotFoundException();

    if (checkFriendShip.status !== Status.PENDING)
      throw new BadRequestException();

    if (
      actionType === ActionType.accept &&
      checkFriendShip.status === Status.PENDING
    ) {
      this.notificationServices.create({
        content: `${checkFriendShip.reciver.name} accept your friend request ^_^`,
        fromId: checkFriendShip.reciver.id,
        toId: checkFriendShip.senderId,
      });

      this.friendRepo.save({
        ...checkFriendShip,
        status: Status.ACCEPT,
      });
      return {
        success: true,
      };
    }

    if (
      actionType === ActionType.reject &&
      checkFriendShip.status === Status.PENDING
    ) {
      return this.friendRepo.save({
        ...checkFriendShip,
        status: Status.CANCEL,
      });
    }
  }

  async remove(id: number, user: any) {
    const checkFriendShip = await this.friendRepo.findOne({
      where: [
        {
          senderId: id,
          reciverId: user.sub,
        },
        {
          senderId: user.sub,
          reciverId: id,
        },
      ],
    });
    if (!checkFriendShip) throw new NotFoundException();

    return this.friendRepo.delete({ id: checkFriendShip.id });
  }
}
