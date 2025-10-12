import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { FeedbackKind } from '@prisma/client';

export class CreateFeedbackDto {
  @IsEnum(FeedbackKind) 
  kind: FeedbackKind;          // INCIDENT | SUGGESTION
  @IsString() 
  category: string;                      // "bus_lleno" | "accidente" | ...
  @IsOptional() @IsString() 
  comment?: string;

  @IsOptional() @IsNumber() 
  latitude?: number;
  @IsOptional() @IsNumber() 
  longitude?: number;

  @IsOptional() @IsString() 
  routeId?: string;
  @IsOptional() @IsString() 
  stopId?: string;
}
