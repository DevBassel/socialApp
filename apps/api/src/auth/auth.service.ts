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

      const checkUser = await this.userRepo.findOneBy({
        email: userData.email,
      });

      console.log('checkUser', checkUser);

      if (checkUser) return this.createToken(checkUser);
      else {
        console.log('create new user');
        const newUser = await this.userRepo.save({
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
          provider: ProviderType.GOOGLE,
        });
        return this.createToken(newUser);
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  createToken(user: User) {
    return {
      access_token: this.jwt.sign(
        {
          sub: user.id,
          email: user.email,
          name: user.name,
        },
        {
          expiresIn: '7d',
        } as JwtSignOptions,
      ),
    };
  }
}
