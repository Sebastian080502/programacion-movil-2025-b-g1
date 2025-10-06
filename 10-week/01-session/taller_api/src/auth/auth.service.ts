import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.findByEmailWithPassword(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    return { id: user.id, nombre: user.nombre, email: user.email };
  }

  async login(email: string, password: string) {
    const safeUser = await this.validateUser(email, password);
    const token = await this.jwt.signAsync({ sub: safeUser.id, email: safeUser.email });
    return { token, user: safeUser };
  }
}
