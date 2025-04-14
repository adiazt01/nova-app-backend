import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendEmail(to: string, subject: string, body: string): void {
    // Logic to send email
    console.log(
      `Sending email to ${to} with subject "${subject}" and body "${body}"`,
    );
  }
}
