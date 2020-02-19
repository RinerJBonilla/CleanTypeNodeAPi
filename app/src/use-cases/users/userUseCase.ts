import { User } from "../../entities/user";
import UserDB from "../../data-access/user.db";

export default class UserUseCase {
  private db: UserDB;

  constructor(userUseCase: UserDB) {
    this.db = userUseCase;
  }

  async BringUser(userId: any) {
    try {
      if (!userId) {
        throw Error("must provide a user id");
      }

      const user = await this.db.getUser(Number(userId));
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async BringAllUsers() {
    try {
      const users = await this.db.getUsers();
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async removeUser(userId: any) {
    try {
      if (!userId) {
        throw Error("must provide a user id");
      }

      const ruser = await this.db.getUser(Number(userId));
      if (!ruser) {
        throw Error("user does not exist");
      }

      const user = await this.db.deleteUser(Number(userId));
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async removeUserTest(username: any) {
    try {
      if (!username) {
        throw Error("must provide a username");
      }

      const user = await this.db.deleteUserTest(username);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async editUser(UserInfo: any) {
    try {
      if (!UserInfo.id) {
        throw Error("must provide user id");
      }

      const user = await this.db.getUser(Number(UserInfo.id));
      if (!user) {
        throw Error("user does not exist");
      }

      let newUser = new User(UserInfo.username, UserInfo.password, UserInfo.id);

      return this.db.putUser(newUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async FindUser(username: string) {
    if (!username) {
      throw Error("provide a username");
    }
    try {
      const exists = await this.db.findUser(username);
      if (exists) {
        return exists;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async AddUser(UserInfo: any) {
    try {
      let newUser = new User(UserInfo.username, UserInfo.password);

      console.log("use case model created: ", newUser);

      const exists = await this.db.findUser(newUser.username);
      if (exists) {
        throw Error("user already exists");
      }

      return this.db.insertUser(newUser);
    } catch (error) {
      console.log("in use case: ", error);
      throw error;
    }
  }
}
