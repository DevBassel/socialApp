import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite, FavoriteResponse } from './enteities/favorite.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from 'src/auth/dto/jwtPayload';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite) private readonly favRepo: Repository<Favorite>,
  ) {}
  async addToFav(postId: number, user: JwtPayload) {
    const check = await this.favRepo.findOneBy({ postId, userId: user.sub });
    if (check) {
      // remove from fav
      this.favRepo.delete({
        postId,
        userId: user.sub,
      });
      return 'removed success';
    } else {
      // add to fav
      this.favRepo.save({
        postId,
        userId: user.sub,
      });
      return 'add success';
    }
  }

  async getFavoriets(user: JwtPayload) {
    const favs = await this.favRepo.find({
      where: {
        userId: user.sub,
      },
      relations: {
        post: true,
      },
    });

    return favs.map((fav) => new FavoriteResponse(fav));
  }
}
