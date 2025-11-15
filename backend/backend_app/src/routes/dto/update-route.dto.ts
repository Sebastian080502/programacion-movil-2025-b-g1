import { IsOptional, IsString } from 'class-validator';
export class UpdateRouteDto {
  @IsOptional() @IsString() 
  code?: string;
  @IsOptional() @IsString() 
  name?: string;
  @IsOptional() @IsString() 
  cityId?: string;
  @IsOptional() @IsString() 
  desc?: string;
}
