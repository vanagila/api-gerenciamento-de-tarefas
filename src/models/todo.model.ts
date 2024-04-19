export class Todo {
  constructor(
    private _id: string,
    private _content: string,
    private _done: boolean,
    private _createdAt: Date
  ) {}

  public get id(): string {
    return this._id;
  }

  public get content(): string {
    return this._content;
  }

  public get done(): boolean {
    return this._done;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public toJSON() {
    return {
      id: this._id,
      content: this._content,
      done: this._done,
      createdAt: this._createdAt,
    };
  }
}
