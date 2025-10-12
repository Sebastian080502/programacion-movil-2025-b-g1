import { IsOptional, IsString } from 'class-validator';
export class CreateRouteDto {
  @IsString() 
  code: string;
  @IsString() 
  name: string;
  @IsOptional() @IsString() 
  color?: string;
  @IsString() 
  cityId: string;
}
