import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCityDto) { return this.prisma.city.create({ data: dto }); }
  findAll() { return this.prisma.city.findMany({ orderBy: { name: 'asc' } }); }
  findOne(id: string) { return this.prisma.city.findUnique({ where: { id } }); }
  update(id: string, dto: UpdateCityDto) { return this.prisma.city.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.city.delete({ where: { id } }); }
}
