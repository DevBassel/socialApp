import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumberString()
  postId: number;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  media: string;
}
