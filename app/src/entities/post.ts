export class Post {
  constructor(
    public content: string,
    public title: string,
    public description: string,
    public userid: number,
    public id?: number
  ) {
    if (!content) {
      throw new Error("Post must have content");
    }

    if (!title) {
      throw new Error("Post must have title");
    }

    if (!description) {
      throw new Error("Post must have description");
    }

    if (!userid) {
      throw new Error("Post must have userid");
    }
    //more validations according to the policies
    if (title.length > 50) {
      throw new Error("title too long, MAX(50)");
    }

    if (description.length > 50) {
      throw new Error("description too long, MAX(50)");
    }

    if (content.length > 10000) {
      throw new Error("content too long, MAX(10000)");
    }
  }

  getContent(): string {
    return this.content;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getUserid(): number {
    return this.userid;
  }

  getId(): number {
    return this.id ? this.id : 0;
  }

  setId(id: number) {
    this.id = id;
  }
}
