import { User as PrismaUser } from '@prisma/client';
import { UserEntity } from './user.entity';

export function toUserEntity(u: PrismaUser): UserEntity {
  return {
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

export function toUserEntities(list: PrismaUser[]): UserEntity[] {
  return list.map(toUserEntity);
}
