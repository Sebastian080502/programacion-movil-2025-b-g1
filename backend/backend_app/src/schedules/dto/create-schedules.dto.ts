import { IsInt, IsString, Min } from 'class-validator';
export class CreateScheduleDto {
  @IsString() 
  dayOfWeek: string;
  @IsString() 
  firstBus: string;
  @IsString() 
  lastBus: string;
  @IsInt() @Min(1) 
  frequency: number;
  @IsString() 
  routeId: string;
}
