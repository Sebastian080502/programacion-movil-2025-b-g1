import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
export class CreateStopDto {
  @IsString() 
  routeId: string;
  @IsInt() @Min(1) 
  orderNo: number;
  @IsString() 
  name: string;
  @IsOptional() @IsNumber() 
  lat?: number;
  @IsOptional() @IsNumber() 
  lng?: number;
}
