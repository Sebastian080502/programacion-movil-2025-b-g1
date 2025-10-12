import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';

@Injectable()
export class StopsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateStopDto) { return this.prisma.stop.create({ data: dto }); }
  findAllByRoute(routeId: string) {
    return this.prisma.stop.findMany({ where: { routeId }, orderBy: { order: 'asc' }});
  }
  update(id: string, dto: UpdateStopDto) { return this.prisma.stop.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.stop.delete({ where: { id } }); }
}
