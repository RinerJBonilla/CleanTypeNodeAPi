import DConnection from "../database";
import { User } from "../entities/user";

export default class Userdb {
  public conn: DConnection;
  constructor(public connect: DConnection) {
    this.conn = this.connect;
  }

  async insertUser(newUser: User) {
    console.log("db access: ", newUser);
    try {
      const qry = `
            INSERT INTO users set 
              username = :username, 
              password = :password`;

      const response = await this.conn.Query(qry, newUser);

      newUser.id = response.insertId;

      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const users: User[] = await this.conn.Query(
          "select id, username from users"
        );

        resolve(users);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async getUser(userId: number): Promise<User> {
    console.log("db access: ", userId);
    try {
      const qry = `
      SELECT 
        id,
        username
       FROM users 
      WHERE id = :userId`;

      const users = await this.conn.Query(qry, { userId });
      return users[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findUser(username: string): Promise<User> {
    console.log("db access: ", username);
    try {
      const qry = `
      SELECT 
        id,
        username,
        password
       FROM users 
      WHERE username = :username`;

      const users = await this.conn.Query(qry, { username });
      if (users[0]) {
        return users[0];
      } else {
        return users[0];
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async putUser(eUser: User): Promise<User> {
    try {
      const users = await this.conn.Query(
        `update users set username = :username, password = :password where id = :id`,
        eUser
      );

      return eUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<any> {
    try {
      const users = await this.conn.Query(
        "delete from users where id = :userId",
        { userId }
      );
      console.log(users);
      return userId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteUserTest(username: string): Promise<any> {
    try {
      const users = await this.conn.Query(
        "delete from users where username = :username",
        { username }
      );
      console.log(users);
      return username;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
