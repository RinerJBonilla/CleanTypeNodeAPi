export class Tag {
  constructor(
    public name: string,
    public postid: number,
    public color?: string,
    public id?: number
  ) {
    if (!name) {
      throw Error("must provide a tag name");
    }
    if (!color) {
      this.color = "#787878";
    }
    if (!postid) {
      throw Error("must provide postid");
    }
    //more validations according to the policies
    if (name.length > 25) {
      throw Error("tag too long, MAX(25)");
    }
  }

  getName(): string {
    return this.name;
  }

  getColor(): string {
    return this.color as string;
  }

  getPostId(): number {
    return this.postid;
  }

  getId(): number {
    return this.id ? this.id : 0;
  }

  setId(id: number) {
    this.id = id;
  }
}
