export class Todo {
  constructor(
    private _id: string,
    private _content: string,
    private _done: boolean
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

  public toJSON() {
    return {
      id: this._id,
      content: this._content,
      done: this._done,
    };
  }
}
