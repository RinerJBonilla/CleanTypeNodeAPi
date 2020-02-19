import DConnection from "../database";
import Userdb from "./user.db";
import { User } from "../entities/user";

let dConn: DConnection;
let uDB: Userdb;

beforeAll(() => {
  dConn = new DConnection();
  uDB = new Userdb(dConn);
});

afterAll(async () => {
  await dConn.Close();
});

describe("User DB", () => {
  test("should bring all users", async () => {
    const posts = await uDB.getUsers();
    expect(posts).toHaveLength(4);
  });

  test("should bring User. 5", async () => {
    const post = await uDB.getUser(5);
    expect(post.id).toBe(5);
  });

  test("should create User", async () => {
    const post = new User("jest", "1234");
    const repost = await uDB.insertUser(post);
    expect(repost.username).toEqual("jest");
    expect(repost.id).toBeDefined();
  });

  test("should edit User", async () => {
    const post = new User("jest2", "12345", 10);
    const repost = await uDB.putUser(post);
    expect(repost.username).toEqual("jest2");
    expect(repost.password).toEqual("12345");
  });

  test("should delete User", async () => {
    const title = "jest";
    const repost = await uDB.deleteUserTest(title);
    expect(repost).toEqual("jest");
  });

  test("should not bring anything when not finding a user", async () => {
    const post = await uDB.getUser(1);
    expect(post).toBeFalsy();
  });
});
