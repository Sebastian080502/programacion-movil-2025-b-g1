import { IsInt, IsString, Max, Min } from 'class-validator';
export class CreateScheduleDto {
  @IsString() 
  routeId: string;
  @IsInt() @Min(0) @Max(6) 
  dayOfWeek: number;   // 0..6 = Dom..Sáb
  @IsString() 
  startTime: string;                // "05:00"
  @IsString() 
  endTime: string;                  // "22:00"
  @IsInt() @Min(1) 
  frequencyMin: number;
}
