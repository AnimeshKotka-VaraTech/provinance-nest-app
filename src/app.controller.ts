import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Sample')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'Check Provinence' })
  @Get()
  getHello(): Promise<any> {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Generate Provinence Wallet' })
  @Get('/generate-wallet')
  generateWallet(): Promise<any> {
    return this.appService.generateWallet();
  }
}
