import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  access_token: string;
}
