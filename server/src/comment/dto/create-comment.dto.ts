import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  postId: number;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  media: string;
}
