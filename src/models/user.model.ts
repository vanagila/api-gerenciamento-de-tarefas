export class User {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _password: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
    };
  }
}
