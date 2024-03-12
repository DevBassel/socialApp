import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostLove } from './entities/postLove.entity';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';
import { JwtPayload } from '../auth/dto/jwtPayload';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(PostLove) private readonly postLove: Repository<PostLove>,
    private readonly notificationServices: NotificationService,
    private readonly userService: UserService,
  ) {}

  create(createPostDto: CreatePostDto, user: JwtPayload) {
    const post = this.postRepo.create({ ...createPostDto, userId: user.sub });
    return this.postRepo.save(post);
  }

  async lovePost(postId: number, user: JwtPayload) {
    const post = await this.postRepo.findOneBy({ id: postId });
    console.log({ postId, user });

    if (!post) throw new NotFoundException('post not found');

    const checkPostLove = await this.postLove.findOneBy({
      postId,
      userId: user.sub,
    });

    if (checkPostLove && checkPostLove.userId === user.sub) {
      // remove love
      return this.postLove.delete({ id: checkPostLove.id, userId: user.sub });
    } else {
      // create love
      return this.postLove.save({
        postId,
        userId: user.sub,
      });
    }
  }

  findAll(page: number) {
    const perPage = 5;
    const skip = (page - 1) * perPage;
    return this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.loves', 'loves')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.content',
        'post.createdAt',
        'user.id',
        'user.picture',
        'user.name',
        'loves.id',
        'loves.userId',
      ])
      .orderBy('post.createdAt', 'DESC')
      .take(perPage)
      .skip(skip)
      .getMany();
  }

  async findOne(id: number) {
    const post = await this.postRepo.find({
      where: { id },
      relations: {
        user: true,
        comments: { user: true },
        loves: true,
      },
    });
    if (!post) throw new NotFoundException();

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const checkPost = await this.findOne(id);
    if (!checkPost) throw new NotFoundException();
    return this.postRepo.save({ ...checkPost, ...updatePostDto });
  }

  async remove(id: number) {
    const checkPost = await this.findOne(id);
    if (!checkPost) throw new NotFoundException();
    return this.postRepo.delete({ id });
  }
}
