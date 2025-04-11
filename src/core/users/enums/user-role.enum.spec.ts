import { UserRole } from './user-role.enum';

describe('UserRole (Enum)', () => {
  it('Should have the correct enum values', () => {
    expect(UserRole.SUPER_ADMIN).toBe('SUPER_ADMIN');
    expect(UserRole.ADMIN).toBe('ADMIN');
    expect(UserRole.USER).toBe('USER');
  });

  it('Should contain all expected roles', () => {
    const roles = Object.values(UserRole);
    expect(roles).toContain('SUPER_ADMIN');
    expect(roles).toContain('ADMIN');
    expect(roles).toContain('USER');
    expect(roles.length).toBe(3);
  });

  it('Should not have unexpected roles', () => {
    const roles = Object.values(UserRole);
    expect(roles).not.toContain('GUEST');
    expect(roles).not.toContain('MODERATOR');
  });
});