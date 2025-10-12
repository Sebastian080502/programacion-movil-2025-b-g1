import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { toUserEntity, toUserEntities } from './entities/user.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { email: string; password: string; fullName?: string }) {
    const password = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: { email: data.email, password, fullName: data.fullName ?? null },
    });
    return toUserEntity(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return toUserEntities(users);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? toUserEntity(user) : null;
  }

  async update(id: string, data: { email?: string; password?: string; fullName?: string }) {
    const payload: any = { ...data };
    if (data.password) payload.password = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.update({ where: { id }, data: payload });
    return toUserEntity(user);
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { ok: true };
  }
}
