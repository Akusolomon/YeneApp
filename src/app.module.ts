import { ChatModule } from './feature/chat/web/ChatModule';
import { ConversationModule } from './feature/chat/conversation/web/ConversationModule';
import { LikeModule } from './feature/likes/web/LikeModule';
import { CommentModule } from './feature/comments/web/CommentModule';
import { InviteModule } from './feature/invites/web/InviteModule';
import { EventGoingModule } from './feature/event_going/web/EventGoingModule';
import { MomentModule } from './feature/moments/web/MomentModule';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CategoryModule } from './feature/categories/web/CategoryModule';
import { EventModule } from './feature/events/web/EventModule';
import { UserModule } from './feature/users/web/UserModule';
import { JwtStrategy } from './util/auth/jwt/JwtStrategy';
import { FriendRequestModule } from './feature/friend_request/web/FriendRequestModule';

@Module({
  imports: [
    ChatModule,
    ConversationModule,
    LikeModule,
    CommentModule,
    InviteModule,
    EventGoingModule,
    FriendRequestModule,
    MomentModule,
    CategoryModule,
    EventModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
