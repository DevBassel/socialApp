import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRes } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { JwtPayload } from 'src/auth/dto/jwtPayload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async getMe(user: JwtPayload) {
    console.log(user);
    return new UserRes(
      await this.userRepo.findOne({
        where: {
          id: user.sub,
        },
      }),
    );
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async removeUser({ email }: any) {
    if (!email) throw new BadRequestException();
    const user: DeleteResult = await this.userRepo.delete({ email });
    return user;
  }
}
