import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
export class UpdateStopDto {
  @IsOptional() @IsString() 
  routeId?: string;
  @IsOptional() @IsInt() @Min(1) 
  orderNo?: number;
  @IsOptional() @IsString() 
  name?: string;
  @IsOptional() @IsNumber() 
  lat?: number;
  @IsOptional() @IsNumber() 
  lng?: number;
}
