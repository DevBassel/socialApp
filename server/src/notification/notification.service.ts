import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notifyRepo: Repository<Notification>,
  ) {}

  findAll(user: any) {
    return this.notifyRepo.find({
      where: { toId: user.sub },
      relations: { from: true },
    });
  }
}
