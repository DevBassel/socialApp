import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/login')
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Body() createAuthDto: CreateAuthDto) {
    console.log('test');
    return this.authService.googleLogin(createAuthDto);
  }
}
