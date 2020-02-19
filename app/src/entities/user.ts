export class User {
  constructor(
    public username: string,
    public password: string,
    public id?: number
  ) {
    console.log("Time to create a user");
    console.log(username);
    console.log(password);
    if (!username || username.length === 0) {
      throw new Error("User must have username");
    }

    if (!password || password.length === 0) {
      throw new Error("User must have password");
    }
    //more validations according to the policies
    if (username.length > 12) {
      throw new Error("Username too long, MAX(12)");
    }
  }
  getUsername(): string {
    return this.username;
  }
  getPassword(): string {
    return this.password;
  }
  getId(): number {
    return this.id ? this.id : 0;
  }

  setId(num: number) {
    this.id = num;
  }
}
