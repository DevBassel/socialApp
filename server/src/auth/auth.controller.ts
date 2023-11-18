import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtGuard } from './strategys/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/login')
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Body() createAuthDto: CreateAuthDto) {
    console.log('test');
    return this.authService.googleLogin(createAuthDto);
  }

  @UseGuards(JwtGuard)
  @Get('test')
  test() {
    return `<h1>Test</h1>`;
  }
}
