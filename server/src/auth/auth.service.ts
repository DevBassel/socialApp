import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ProviderType } from 'src/user/enums/ProviderType.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async googleLogin(createAuthDto: CreateAuthDto) {
    try {
      const userData = await (
        await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: {
            Authorization: `Bearer ${createAuthDto.access_token}`,
          },
        })
      ).json();
      console.log('google', userData);

      const checkUser = await this.userRepo.findOneBy({
        email: userData.email,
        provider: ProviderType.GOOGLE,
      });

      if (checkUser)
        return {
          access_token: this.jwt.sign(
            { sub: checkUser.id, name: checkUser.name, email: checkUser.email },
            {
              expiresIn: '7d',
            } as JwtSignOptions,
          ),
        };
      else {
        // create user
        console.log('create user');
        const newUser = await this.userRepo.save({
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
          provider: ProviderType.GOOGLE,
        });
        return {
          access_token: this.jwt.sign(
            { sub: newUser.id, name: newUser.name, email: newUser.email },
            {
              expiresIn: '7d',
            } as JwtSignOptions,
          ),
        };
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
