import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { EmailService } from '../common/services/email/email.service';
import { Employee } from './models/employee.model';
import { EmployeeResolver } from './resolvers/employee.resolver';

import { QueueEmailMessagePublisherService } from './services/queue/email-message-publisher.service';
import { QueueEmailMessageSubscriberService } from './services/queue/email-message-subscriber.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [EmailService, EmployeeResolver, QueueEmailMessagePublisherService, QueueEmailMessageSubscriberService],
  exports: [TypeOrmModule] 
})
export class EmployeeModule {}
