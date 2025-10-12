export class UserEntity {
  id: string;
  email: string;
  fullName?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
