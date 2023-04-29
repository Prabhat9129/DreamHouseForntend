export class User {
  constructor(
    public email: string,

    private utoken: string
  ) {}
  get token() {
    if (!this.utoken) {
      return null;
    }
    return this.utoken;
  }
}
