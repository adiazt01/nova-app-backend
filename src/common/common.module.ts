import { Module } from '@nestjs/common';
import { EncryptionsService } from './services/encryptions/encryptions.service';

@Module({
  providers: [EncryptionsService],
  exports: [EncryptionsService]
})
export class CommonModule {}
