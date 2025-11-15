import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class UpdateScheduleDto {
  @IsOptional() @IsString() 
  routeId?: string;
  @IsOptional() @IsInt() @Min(0) @Max(6) 
  dayOfWeek?: number;
  @IsOptional() @IsString() 
  startTime?: string;
  @IsOptional() @IsString() 
  endTime?: string;
  @IsOptional() @IsInt() @Min(1) 
  frequencyMin?: number;
}
