import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { vertexAiNew } from './vertexai';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('testVertex')
  async testVertex(@Res() response: Response): Promise<any> {
    const promptString = 'who are you?'; // Replace with your actual prompt
    const result = await vertexAiNew(promptString);

    return response.status(HttpStatus.OK).send(result); // Send back the result from vertexAi
  }
}
