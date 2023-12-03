import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Friend, Notification, User])],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
