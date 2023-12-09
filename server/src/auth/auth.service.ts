import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async googleLogin(createAuthDto: CreateAuthDto) {
    const client = new OAuth2Client({
      clientId: this.config.getOrThrow('client_Id'),
      clientSecret: this.config.getOrThrow('clientSecret'),
    });

    const data = await client.verifyIdToken({
      idToken: createAuthDto.access_token,
      audience: this.config.getOrThrow('client_Id'),
    });

    const { email, picture, name, sub } = data.getPayload();
    const checkUser = await this.userRepo.findOneBy({ providerId: sub });

    if (checkUser)
      return {
        ...checkUser,
        access_token: this.jwt.sign({ sub: checkUser.id, email }),
      };

    console.log('creating user...');
    const user = this.userRepo.create({
      providerId: sub,
      name,
      email,
      picture,
    });

    this.userRepo.save(user);

    return { ...user, access_token: this.jwt.sign({ sub, email }) };
  }
}
