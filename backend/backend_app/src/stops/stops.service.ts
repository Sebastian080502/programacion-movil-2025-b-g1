import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Stop } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';

@Injectable()
export class StopsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateStopDto): Promise<Stop> {
    const data: Prisma.StopCreateInput = {
      routeId: dto.routeId,
      orderNo: dto.orderNo,
      name: dto.name,
      lat: dto.lat,
      lng: dto.lng,
    };
    return this.prisma.stop.create({ data });
  }

  findAll(): Promise<Stop[]> {
    return this.prisma.stop.findMany({ orderBy: 
      [{ routeId: 'asc' }, { orderNo: 'asc' }] });
  }

  async findOne(id: string): Promise<Stop> {
    const s = await this.prisma.stop.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Parada no encontrada');
    return s;
  }

  update(id: string, dto: UpdateStopDto): Promise<Stop> {
    const data: Prisma.StopUpdateInput = {
      routeId: dto.routeId,
      orderNo: dto.orderNo,
      name: dto.name,
      lat: dto.lat,
      lng: dto.lng,
    };
    return this.prisma.stop.update({ where: { id }, data });
  }

  remove(id: string): Promise<Stop> {
    return this.prisma.stop.delete({ where: { id } });
  }
}
