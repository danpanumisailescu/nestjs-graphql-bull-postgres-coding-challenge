import * as fs from 'fs';
import * as path from 'path';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendEmailOptions, UploadAttachmentOptions } from 'mailslurp-client';
import { EmailService } from '../../../common/services/email/email.service';
import { EmployeeCreateMessageDto } from '../../dto/employee-create-message.dto';


@Processor('email')
export class QueueEmailMessageSubscriberService {
  constructor(private emailService: EmailService) {}

  @Process('sendWelcomeEmail')
  async processWelcomeEmail(job: Job<EmployeeCreateMessageDto>) {
    console.log("processWelcomeEmail ", job.data);
    try {
    const pathToAttachment = path.join(__dirname + '/attachments/Welcome.webp');
    const fileBase64Encoded = await fs.promises.readFile(pathToAttachment, {
      encoding: 'base64',
    });
    const attachmentsOptions: UploadAttachmentOptions[] = [{
      base64Contents: fileBase64Encoded,
      contentType: 'image/webp',
      filename: path.basename(pathToAttachment)
    }]

    const { email, name, jobTitle, department } = job.data;

    const mailOptions: SendEmailOptions = {
      to: [email],
      subject: `Welcome to Our Team, ${name}!`,
      isHTML: true,
      body: `
        <p>Hello ${name},</p>
        <p>We are thrilled to welcome you to our team as the new ${jobTitle} in the ${department} department.</p>
        <p>We believe your skills and experience will be a valuable asset to our company, and we look forward to seeing the great things you'll accomplish with us.</p>
        <p>Please don't hesitate to reach out if you have any questions or need assistance as you get settled in.</p>
        <p>Once again, welcome aboard! We're excited to have you with us.</p>
        <p>Best regards,</p>
        <p>The Team</p>
        <img src="data:image/webp;base64,${fileBase64Encoded}" alt="Welcome Image" />
      `,
    };
    
    await this.emailService.sendEmail(mailOptions, attachmentsOptions);
  } catch (error) {
    console.log("processWelcomeEmail error ", error);
      throw new Error(`Failed to process welcome email: ${error.message}`);
  }
  }
}
