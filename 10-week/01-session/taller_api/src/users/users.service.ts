import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { nombre: string; email: string; password: string }) {
    const exists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new BadRequestException('Email ya registrado');

    const password = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { nombre: data.nombre, email: data.email, password },
      select: { id: true, nombre: true, email: true, createdAt: true, updatedAt: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, nombre: true, email: true, createdAt: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const u = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, nombre: true, email: true, createdAt: true, updatedAt: true },
    });
    if (!u) throw new NotFoundException('No encontrado');
    return u;
  }

  async findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({ where: { email } }); // incluye password
  }

  async update(id: string, patch: Partial<{ nombre: string; email: string; password: string }>) {
    if (patch.email) {
      const existEmail = await this.prisma.user.findUnique({ where: { email: patch.email } });
      if (existEmail && existEmail.id !== id) throw new BadRequestException('Email ya registrado');
    }
    if (patch.password) {
      patch.password = await bcrypt.hash(patch.password, 10);
    }
    const updated = await this.prisma.user.update({
      where: { id },
      data: patch,
      select: { id: true, nombre: true, email: true, createdAt: true, updatedAt: true },
    });
    return updated;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { ok: true };
  }
}
