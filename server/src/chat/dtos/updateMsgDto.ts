import { IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateMsgDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(1)
  content: string;
}
