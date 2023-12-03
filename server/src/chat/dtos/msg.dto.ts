import { IsNumber, IsString, MinLength } from 'class-validator';

export class MsgDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsNumber()
  reciverId: number;
}
