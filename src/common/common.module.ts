import { Global, Module } from '@nestjs/common';
import { EncryptionsService } from './services/encryptions/encryptions.service';
import { EmailModule } from './email/email.module';

@Global()
@Module({
  imports: [EmailModule],
  providers: [EncryptionsService],
  exports: [EncryptionsService],
})
export class CommonModule {}
