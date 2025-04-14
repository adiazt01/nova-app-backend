import { UserRole } from 'src/users/enums/user-role.enum';

export interface JwtPayload {
  email: string;
  id: number;
  role: UserRole;
  iat?: number;
  exp?: number;
}
