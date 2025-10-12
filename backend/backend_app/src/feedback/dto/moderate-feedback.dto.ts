import { IsEnum } from 'class-validator';
import { FeedbackStatus } from '@prisma/client';
export class ModerateFeedbackDto {
  @IsEnum(FeedbackStatus) 
  status: FeedbackStatus; // PUBLISHED | UNDER_REVIEW | REJECTED | RESOLVED
}
