import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateScheduleDto) { return this.prisma.schedule.create({ data: dto }); }
  findByRoute(routeId: string) { return this.prisma.schedule.findMany({ where: { routeId } }); }
  update(id: string, dto: UpdateScheduleDto) { return this.prisma.schedule.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.schedule.delete({ where: { id } }); }
}
