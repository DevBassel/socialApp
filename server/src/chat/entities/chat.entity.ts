import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Msgs } from './msg.entity';

@Entity({ name: 'chats' })
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.chats)
  sender: User;

  @Column()
  senderId: number;

  @ManyToOne(() => User, (user) => user.chats)
  reciever: User;

  @Column()
  recieverId: number;

  @OneToMany(() => Msgs, (msgs) => msgs.chat)
  messags: Msgs[];

  @CreateDateColumn()
  createdAt: Date;
}
