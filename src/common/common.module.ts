import { Module } from '@nestjs/common';
import { EncryptionsService } from './services/encryptions/encryptions.service';
import { EmailModule } from './email/email.module';

@Module({
  providers: [EncryptionsService],
  exports: [EncryptionsService],
  imports: [EmailModule]
})
export class CommonModule {}
