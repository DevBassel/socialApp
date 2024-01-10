import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostLove } from './entities/postLove.entity';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(PostLove) private readonly postLove: Repository<PostLove>,
    private readonly notificationServices: NotificationService,
    private readonly userService: UserService,
  ) {}

  create(createPostDto: CreatePostDto, user: any) {
    const post = this.postRepo.create({ ...createPostDto, userId: user.sub });
    return this.postRepo.save(post);
  }

  async lovePost(postId: number, user: any) {
    const post = await this.postRepo.findOneBy({ id: postId });

    if (!post) throw new NotFoundException('post not found');

    const checkPostLove = await this.postLove.findOneBy({
      postId,
      userId: user.sub,
    });

    if (checkPostLove) {
      // remove love
      this.postLove.delete({ postId });
    } else {
      // create love
      if (post.userId !== user.sub) {
        const from = await this.userService.findOne(user.sub);

        this.notificationServices.create({
          content: `${from.name} loved your post <3`,
          fromId: user.sub,
          toId: post.userId,
        });
      }
      this.postLove.save({
        postId,
        userId: user.sub,
      });
    }
    return 'success';
  }

  findAll() {
    return this.postRepo.find({
      relations: { user: true, loves: true },
    });
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
