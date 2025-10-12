import { IsNumber, IsString, Min } from 'class-validator';
export class CreateStopDto {
  @IsString() 
  name: string;
  @IsNumber() 
  latitude: number;
  @IsNumber() 
  longitude: number;
  @IsNumber() @Min(0) 
  order: number;
  @IsString() 
  routeId: string;
}
