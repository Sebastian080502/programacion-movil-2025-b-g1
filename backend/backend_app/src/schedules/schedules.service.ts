import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Schedule } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedules.dto';
import { UpdateScheduleDto } from './dto/update-schedules.dto';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateScheduleDto): Promise<Schedule> {
    const data: Prisma.ScheduleCreateInput = {
      routeId: dto.routeId,
      dayOfWeek: dto.dayOfWeek,
      startTime: dto.startTime,
      endTime: dto.endTime,
      frequencyMin: dto.frequencyMin,
    };
    return this.prisma.schedule.create({ data });
  }

  findAll(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      orderBy: [{ routeId: 'asc' }, { dayOfWeek: 'asc' }],
    });
  }

  async findOne(id: string): Promise<Schedule> {
    const sc = await this.prisma.schedule.findUnique({ where: { id } });
    if (!sc) throw new NotFoundException('Horario no encontrado');
    return sc;
  }

  update(id: string, dto: UpdateScheduleDto): Promise<Schedule> {
    const data: Prisma.ScheduleUpdateInput = {
      routeId: dto.routeId,
      dayOfWeek: dto.dayOfWeek,
      startTime: dto.startTime,
      endTime: dto.endTime,
      frequencyMin: dto.frequencyMin,
    };
    return this.prisma.schedule.update({ where: { id }, data });
  }

  remove(id: string): Promise<Schedule> {
    return this.prisma.schedule.delete({ where: { id } });
  }
}
