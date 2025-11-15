import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Crear usuario (no lo usas mucho porque ya tienes /auth/register, pero queda)
  async create(email: string, password: string, data: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
      },
    });
  }

  // Listar todos los usuarios
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Buscar uno por id
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // Actualizar usuario
  async update(id: string, data: UpdateUserDto): Promise<User> {
    // tipo seguro para el update
    const patch: Prisma.UserUpdateInput = {};

    if (data.email) {
      patch.email = data.email;
    }

    if (data.password) {
      patch.passwordHash = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: patch,
    });
  }

  // Eliminar usuario
  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
