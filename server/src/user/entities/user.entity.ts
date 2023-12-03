import { Exclude } from 'class-transformer';
import { Chat } from 'src/chat/entities/chat.entity';
import { Msgs } from 'src/chat/entities/msg.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Friend } from 'src/friend/entities/friend.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  picture: string;

  @Column()
  providerId: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Friend, (friend) => friend.sender)
  friends_1: Friend[];

  @OneToMany(() => Friend, (friend) => friend.reciver)
  friends_2: Friend[];

  @OneToMany(() => Notification, (notification) => notification.from)
  notification: Notification;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment;

  @OneToMany(() => Chat, (chat) => chat.sender)
  chats: Chat[];

  @OneToMany(() => Msgs, (msgs) => msgs.sender)
  messags: Msgs[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class UserRes extends User {
  @Exclude()
  providerId: string;

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}
