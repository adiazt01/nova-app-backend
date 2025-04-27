import { Controller, Get, NotImplementedException } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller({
  path: '',
  version: '1',
})
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get('')
  async refreshToken() {  
    throw new NotImplementedException('Not implemented yet');
  }
}
