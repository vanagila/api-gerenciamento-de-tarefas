import jwt from "jsonwebtoken";

export class JWTAdapter {
  private _secret: string;
  private _expireIn: string;

  constructor(secret: string, expireIn: string) {
    this._secret = secret;
    this._expireIn = expireIn;
  }

  public generateToken(data: any): string {
    const token = jwt.sign(data, this._secret, {
      expiresIn: this._expireIn,
    });

    return token;
  }

  public decodeToken(token: string): any {
    const data = jwt.verify(token, this._secret);

    if (!data) return undefined;

    return data;
  }
}
