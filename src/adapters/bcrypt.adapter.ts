import bcrypt from "bcrypt";

export class BcryptAdapter {
  private _salt: number;

  constructor(salt: number) {
    this._salt = salt;
  }

  public async generateHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this._salt);

    return hash;
  }

  public async matchesHash(password: string, hash: string): Promise<boolean> {
    const matches = await bcrypt.compare(password, hash);

    return matches;
  }
}
