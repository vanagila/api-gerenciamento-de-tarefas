export class Todo {
  constructor(private _id: string, private _content: string) {}

  public get id(): string {
    return this._id;
  }

  public get content(): string {
    return this._content;
  }

  public toJSON() {
    return {
      id: this._id,
      content: this._content,
    };
  }
}
