import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite, FavoriteResponse } from './enteities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite) private readonly favRepo: Repository<Favorite>,
  ) {}
  async addToFav(postId: number, user: any) {
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

  async getFavoriets(user: any) {
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
