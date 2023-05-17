import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../../infrastructure/database/database.module';
import { commandControllers, commandHandlers } from './commands';

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [...commandHandlers],
  controllers: [...commandControllers],
})
export class PolicyModule {}
