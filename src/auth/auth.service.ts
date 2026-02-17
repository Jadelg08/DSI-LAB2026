import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {

  const { email, password } = loginDto;

  // Buscar usuario
  const user = await this.prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  // Comparar contraseña
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  // Generar token
  const payload = {
    sub: user.id,
    email: user.email,
  };

  const token = this.jwtService.sign(payload);

  return {
    access_token: token,
  };
}
}