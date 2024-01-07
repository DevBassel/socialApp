import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostLove {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.loves)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Post, (post) => post.loves)
  post: Post;

  @Column()
  postId: number;

  @CreateDateColumn()
  createdAt: Date;
}
