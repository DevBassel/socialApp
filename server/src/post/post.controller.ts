import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from 'src/auth/strategys/guards/jwt.guard';
import { RoleGuard } from '../auth/strategys/guards/role.guard';
import { Role } from '../decorators/role.decorator';
import { RoleType } from '../user/enums/Roule.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '../auth/dto/jwtPayload';

@UseGuards(JwtGuard)
@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role([RoleType.Admin, RoleType.User])
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.postService.create(createPostDto, req.user);
  }

  @Get()
  findAll(@Query('page', ParseIntPipe) page: number) {
    console.log(page);
    return this.postService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Post('love')
  lovePost(
    @Body('postId', ParseIntPipe) postId: number,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.postService.lovePost(postId, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
