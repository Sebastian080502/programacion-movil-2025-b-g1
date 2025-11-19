import {Injectable,UnauthorizedException,BadRequestException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './dto/jwt-payload';
import { PasswordReset, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  // ========= Helpers =========

  private async signToken(userId: string, email: string): Promise<string> {
    const payload: JwtPayload = { sub: userId, email };
    return this.jwt.signAsync(payload);
  }

  private generateCode(): string {
    // Código de 6 dígitos
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // ========= Registro =========

  async register(email: string, password: string) {
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) {
      throw new BadRequestException('El usuario ya existe');
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, passwordHash: hashed },
    });

    return {
      message: 'Usuario registrado exitosamente',
      user: { id: user.id, email: user.email },
    };
  }

  // ========= Login =========

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = await this.signToken(user.id, user.email);
    return { access_token: token };
  }

  // ========= Forgot password (enviar código) =========

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Por seguridad podrías no decir si existe o no; aquí sí validamos.
    if (!user) {
      throw new BadRequestException(
        'Si el correo existe, se enviará un código de recuperación',
      );
    }

    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await this.prisma.passwordReset.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    // TODO: enviar correo real con el código
    console.log(`Código de recuperación para ${email}: ${code}`);

    return {
      message:
        'Si el correo existe, se ha enviado un código de recuperación',
    };
  }

  // ========= Reset password (usar código) =========

  async resetPassword(
  email: string,
  code: string,
  newPassword: string,
): Promise<{ message: string }> {
  const record: PasswordReset | null = await this.prisma.passwordReset.findFirst(
    {
      where: {
        email,
        code,
        usedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    },
  );

  if (!record) {
    throw new BadRequestException('Código inválido');
  }

  const now = new Date();

  if (record.expiresAt < now) {
    throw new BadRequestException('El código ha expirado');
  }

  const user: User | null = await this.prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new BadRequestException('Usuario no encontrado');
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  await this.prisma.$transaction([
    this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newHash },
    }),
    this.prisma.passwordReset.update({
      where: { id: record.id },
      data: { usedAt: now },
    }),
  ]);

  return { message: 'Contraseña actualizada correctamente' };
} 

  // ========= Validación de token =========

  async validateUser(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return { id: user.id, email: user.email };
  }
}
