import { Module } from '@nestjs/common';
import { EmailService } from './services/email/email.service';

@Module({
    providers: [EmailService],
    exports: [EmailService], 
})
export class CommonModule {}
