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
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(PostLove) private readonly postLove: Repository<PostLove>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
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

  async findAll(page: number, user: JwtPayload) {
    const perPage = 5;
    const skip = (page - 1) * perPage;
    return (
      this.postRepo
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')

        // count of comments
        .leftJoin('post.comments', 'comments')
        .loadRelationCountAndMap('post.commentCount', 'post.comments')
        // count of loves
        .leftJoin('post.loves', 'loves')
        .loadRelationCountAndMap('post.loveCount', 'post.loves')

        // check if current user love post
        .leftJoinAndMapOne(
          'post.userLovePost',
          'post.loves',
          'postLove',
          'postLove.userId = :userId',
          { userId: user.sub },
        )
        .select([
          'post.id',
          'post.content',
          'post.createdAt',
          'user.id',
          'user.picture',
          'user.name',
          'postLove.id',
          'postLove.userId',
        ])
        .orderBy('post.createdAt', 'DESC')
        .take(perPage)
        .skip(skip)
        .getMany()
    );
  }

  async findOne(id: number, user: JwtPayload) {
    return (
      this.postRepo
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .where('post.id = :id', { id })
        // count of comments
        .leftJoin('post.comments', 'comments')
        .loadRelationCountAndMap('post.commentCount', 'post.comments')
        // count of loves
        .leftJoin('post.loves', 'loves')
        .loadRelationCountAndMap('post.loveCount', 'post.loves')

        // check if current user love post
        .leftJoinAndMapOne(
          'post.userLovePost',
          'post.loves',
          'postLove',
          'postLove.userId = :userId',
          { userId: user.sub },
        )
        .select([
          'post.id',
          'post.content',
          'post.createdAt',
          'user.id',
          'user.picture',
          'user.name',
          'postLove.userId',
        ])
        .getOne()
    );
  }

  async update(id: number, updatePostDto: UpdatePostDto, user: JwtPayload) {
    const checkPost = await this.findOne(id, user);

    if (!checkPost) throw new NotFoundException();
    return this.postRepo.save({ ...checkPost, ...updatePostDto });
  }

  async remove(id: number, user: JwtPayload) {
    const checkPost = await this.findOne(id, user);
    if (!checkPost) throw new NotFoundException();
    return this.postRepo.delete({ id });
  }
}
