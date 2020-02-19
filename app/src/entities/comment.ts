export class Comment {
  constructor(
    public message: string,
    public postid: number,
    public userid: number,
    public id?: number
  ) {
    if (!message) {
      throw Error("must provide a message");
    }
    if (!postid) {
      throw Error("must provide a postid");
    }
    if (!userid) {
      throw Error("must provide a userid");
    }
    //more validations according to the policies
    if (message.length > 1024) {
      throw Error("message too long, MAX(1024)");
    }
  }

  getMessage(): string {
    return this.message;
  }

  getPostId(): number {
    return this.postid;
  }

  getUserId(): number {
    return this.userid;
  }

  getId(): number {
    return this.id ? this.id : 0;
  }

  setId(id: number) {
    this.id = id;
  }
}
