// import { Exclude } from 'class-transformer';
import { Chat } from '../../chat/entities/chat.entity';
import { Msgs } from '../../chat/entities/msg.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Friend } from '../../friend/entities/friend.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { Post } from '../../post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleType } from '../enums/Roule.enum';
import { PostLove } from '../../post/entities/postLove.entity';
import { Favorite } from '../../favorites/enteities/favorite.entity';
import { ProviderType } from '../enums/ProviderType.enum';

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

  @Column({ default: RoleType.User })
  role: RoleType;

  @Column()
  provider: ProviderType;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Favorite, (fav) => fav.user)
  favorites: Favorite[];

  @OneToMany(() => PostLove, (postlove) => postlove.user)
  loves: PostLove[];

  @OneToMany(() => Friend, (friend) => friend.sender, { onDelete: 'CASCADE' })
  friends_1: Friend[];

  @OneToMany(() => Friend, (friend) => friend.reciver, { onDelete: 'CASCADE' })
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
  // @Exclude()
  // providerId: string;

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}
