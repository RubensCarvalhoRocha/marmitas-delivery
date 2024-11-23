export class UserRegistration {
  public role?: 'ROLE_USER' | 'ROLE_GERENTE' | 'ROLE_ADMIN';
  public username?: string;
  public password?: string;
  public name?: string;

  constructor(userRegistration?: Partial<UserRegistration>) {
    if (userRegistration) {
      Object.assign(this, userRegistration);
    }
  }
}
