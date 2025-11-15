import { IsOptional, IsString } from 'class-validator';
export class CreateFeedbackDto {
  @IsString() 
  routeId: string;
  @IsString() 
  title: string;
  @IsOptional() @IsString() 
  body?: string;
  @IsOptional() @IsString() 
  createdBy?: string;
}
