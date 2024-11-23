export class JwtResponse {
  public username?: string;
  public token?: string;
  public type?: string;
  public roles?: string[];

  constructor(jwtResponse?: Partial<JwtResponse>) {
    if (jwtResponse) {
      Object.assign(this, jwtResponse);
    }
  }
}
