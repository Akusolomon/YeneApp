import { Module } from '@nestjs/common';
import { ConversationController } from './ConversationController';

@Module({
  imports: [],
  controllers: [ConversationController],
  providers: [],
})
export class ConversationModule {}
