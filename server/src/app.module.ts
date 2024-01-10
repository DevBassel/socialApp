import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './DB/db.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { FriendModule } from './friend/friend.module';
import { NotificationModule } from './notification/notification.module';
import { CommentModule } from './comment/comment.module';
import { ChatModule } from './chat/chat.module';
import { FavoriteModule } from './favorites/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    AuthModule,
    UserModule,
    PostModule,
    FavoriteModule,
    FriendModule,
    NotificationModule,
    CommentModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
