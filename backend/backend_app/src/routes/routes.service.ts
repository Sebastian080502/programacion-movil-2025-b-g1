import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  create(data: { code: string; name: string; cityId: string; desc?: string }) {
    return this.prisma.route.create({ data });
  }

  findAll() {
    return this.prisma.route.findMany({ 
      orderBy: 
      [{ name: 
        'asc' }] 
      });
  }

  async findOne(id: string) {
    const r = await this.prisma.route.findUnique({ 
      where: { id } });
    if (!r) throw new NotFoundException('Ruta no encontrada');
    return r;
  }

  update(id: string, data: { code?: string; name?: string; cityId?: string; desc?: string }) {
    return this.prisma.route.update({ 
      where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.route.delete({ 
      where: { id } });
  }
}
