export class User {
  public id?: any;
  public role?: 'ROLE_USER' | 'ROLE_GERENTE' | 'ROLE_ADMIN';
  public username?: string;
  public active?: boolean;
  public name?: string;

  constructor(user?: Partial<User>) {
    if (user) {
      Object.assign(this, user);
    }
  }
}
