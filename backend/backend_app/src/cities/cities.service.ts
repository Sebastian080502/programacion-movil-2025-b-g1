import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  create(data: { name: string }) { 
    return this.prisma.city.create({ data }); 
  }
  findAll() { 
    return this.prisma.city.findMany({ 
      orderBy: 
      { name: 'asc' 

      } 
    }); 
  }

  async findOne(id: string) {
    const city = await this.prisma.city.findUnique({ 
      where: { id } });
    if (!city) throw new NotFoundException('Ciudad no encontrada');
    return city;
  }

  update(id: string, data: { name?: string }) {
    return this.prisma.city.update({ 
      where: { id }, data });
  }

  remove(id: string) { 
    return this.prisma.city.delete({ 
      where: { id } }); 
  }
}
