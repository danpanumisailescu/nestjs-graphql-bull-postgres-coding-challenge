import { Injectable } from '@nestjs/common';
import { MailSlurp, SendEmailOptions, UploadAttachmentOptions } from 'mailslurp-client';

@Injectable()
export class EmailService {
  private mailslurp: MailSlurp;
  
  constructor() {
    this.mailslurp = new MailSlurp({ apiKey: process.env.EMAIL_SLURP_API_KEY });
  }

  async sendEmail(options: SendEmailOptions, attachmentsOptions?: UploadAttachmentOptions[]): Promise<void> {
    try {
      const inbox = await this.mailslurp.getInbox(process.env.EMAIL_SLURP_FROM_INBOX_ID)
      options.from = inbox.emailAddress;
      
      let attachments = [];
      if(attachmentsOptions) {
        for(let i=0; i<attachmentsOptions.length; i++) {
          const uploadAttachmentOptions = attachmentsOptions[i];
          const [attachmentId] =
          await this.mailslurp.attachmentController.uploadAttachment({
            uploadAttachmentOptions
          });
          attachments.push(attachmentId);
        }
      }
      
      await this.mailslurp.sendEmail(inbox.id, {
        ...options,
        attachments,
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}