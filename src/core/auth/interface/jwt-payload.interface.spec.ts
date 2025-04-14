import { UserRole } from 'src/core/users/enums/user-role.enum';
import { JwtPayload } from './jwt-payload.interface';

describe('JwtPayload Interface', () => {
  it('should allow valid JwtPayload objects', () => {
    const validPayload: JwtPayload = {
      email: 'test@example.com',
      id: 1,
      username: 'testuser',
      role: UserRole.ADMIN,
      iat: 1633024800,
      exp: 1633028400,
    };

    expect(validPayload).toBeDefined();
    expect(validPayload.email).toBe('test@example.com');
    expect(validPayload.id).toBe(1);
    expect(validPayload.username).toBe('testuser');
    expect(validPayload.role).toBe(UserRole.ADMIN);
    expect(validPayload.iat).toBe(1633024800);
    expect(validPayload.exp).toBe(1633028400);
  });

  it('should allow JwtPayload objects without optional fields', () => {
    const validPayload: JwtPayload = {
      email: 'test@example.com',
      id: 2,
      username: 'anotheruser',
      role: UserRole.USER,
    };

    expect(validPayload).toBeDefined();
    expect(validPayload.email).toBe('test@example.com');
    expect(validPayload.id).toBe(2);
    expect(validPayload.username).toBe('anotheruser');
    expect(validPayload.role).toBe(UserRole.USER);
    expect(validPayload.iat).toBeUndefined();
    expect(validPayload.exp).toBeUndefined();
  });
});
