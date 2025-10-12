import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ModerateFeedbackDto } from './dto/moderate-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  create(userId: string | null, dto: CreateFeedbackDto) {
    return this.prisma.feedback.create({
      data: { ...dto, userId },
    });
  }

  list(routeId?: string, stopId?: string) {
    return this.prisma.feedback.findMany({
      where: { routeId: routeId || undefined, stopId: stopId || undefined },
      orderBy: { createdAt: 'desc' },
    });
  }

  update(id: string, dto: UpdateFeedbackDto) {
    return this.prisma.feedback.update({ where: { id }, data: dto });
  }

  moderate(id: string, dto: ModerateFeedbackDto) {
    return this.prisma.feedback.update({ where: { id }, data: { status: dto.status } });
  }

  remove(id: string) { return this.prisma.feedback.delete({ where: { id } }); }
}
