import { IsOptional, IsString } from 'class-validator';

export class UpdateFeedbackDto {
  @IsOptional()
  @IsString()
  routeId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
