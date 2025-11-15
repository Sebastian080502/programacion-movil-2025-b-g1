import { IsOptional, IsString } from 'class-validator';
export class CreateRouteDto {
  @IsString() 
  code: string;
  @IsString() 
  name: string;
  @IsString() 
  cityId: string;
  @IsOptional() @IsString() 
  desc?: string;
}
