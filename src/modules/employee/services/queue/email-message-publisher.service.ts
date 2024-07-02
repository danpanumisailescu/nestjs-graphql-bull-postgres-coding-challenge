import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EmployeeCreateMessageDto } from '../../dto/employee-create-message.dto';

@Injectable()
export class QueueEmailMessagePublisherService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {
  }

  async enqueueWelcomeEmail(employeeData: EmployeeCreateMessageDto): Promise<void> {
    try {
      const result = await this.emailQueue.add('sendWelcomeEmail', employeeData, {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 5000 
        }
      });
    } catch (error) {
      console.log("enqueueWelcomeEmail error ", error);
        throw new Error(`Failed to enqueue welcome email: ${error.message}`);
    }
  }
}

