import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Feedback } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFeedbackDto): Promise<Feedback> {
    const data: Prisma.FeedbackCreateInput = {
      routeId: dto.routeId,
      title: dto.title,
      body: dto.body,
      createdBy: dto.createdBy,

    };
    return this.prisma.feedback.create({ data });
  }

  findAll(): Promise<Feedback[]> {
    return this.prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Feedback> {
    const fb = await this.prisma.feedback.findUnique({ where: { id } });
    if (!fb) throw new NotFoundException('Feedback no encontrado');
    return fb;
  }

  update(id: string, dto: UpdateFeedbackDto): Promise<Feedback> {
    const data: Prisma.FeedbackUpdateInput = {
      routeId: dto.routeId,
      title: dto.title,
      body: dto.body,
      createdBy: dto.createdBy,
    };
    return this.prisma.feedback.update({ where: { id }, data });
  }

  remove(id: string): Promise<Feedback> {
    return this.prisma.feedback.delete({ where: { id } });
  }
}
