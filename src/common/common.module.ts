import { Global, Module } from '@nestjs/common';
import { EncryptionsService } from './services/encryptions/encryptions.service';
import { EmailModule } from './email/email.module';

@Global()
@Module({
  providers: [EncryptionsService],
  exports: [EncryptionsService],
  imports: [EmailModule],
})
export class CommonModule {}
