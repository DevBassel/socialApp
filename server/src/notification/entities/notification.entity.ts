import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.notification, { onDelete: 'CASCADE' })
  from: User;

  @Column()
  fromId: number;

  @ManyToOne(() => User, (user) => user.notification, { onDelete: 'CASCADE' })
  to: User;

  @Column({ nullable: true })
  toId: number;

  @CreateDateColumn()
  createdAt: Date;
}
