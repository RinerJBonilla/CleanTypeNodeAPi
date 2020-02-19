import DConnection from "../../database";
import Userdb from "../../data-access/user.db";
import UserUseCase from "./userUseCase";

let dConn: DConnection;
let uDB: Userdb;
let userUseCase: UserUseCase;

beforeAll(() => {
  dConn = new DConnection();
  uDB = new Userdb(dConn);
  userUseCase = new UserUseCase(uDB);
});

afterAll(async () => {
  await dConn.Close();
});

describe("User use case", () => {
  test("should bring a user", async () => {
    const post = await userUseCase.BringUser(5);
    expect(post.id).toBe(5);
  });

  test("should bring all 4 users", async () => {
    const posts = await userUseCase.BringAllUsers();
    expect(posts).toHaveLength(4);
  });

  test("should create a user", async () => {
    const post = {
      username: "jest",
      password: "1234"
    };
    const repost = await userUseCase.AddUser(post);
    expect(repost.id).toBeDefined();
    expect(repost.username).toEqual("jest");
    expect(repost.password).toEqual("1234");
  });

  test("should edit a user", async () => {
    const post = {
      username: "jest3",
      password: "1234",
      id: 10
    };
    const repost = await userUseCase.editUser(post);
    expect(repost.id).toBeDefined();
    expect(repost.username).toEqual("jest3");
    expect(repost.password).toEqual("1234");
  });

  test("should remove a User", async () => {
    const repost = await userUseCase.removeUserTest("jest");
    expect(repost).toEqual("jest");
  });

  test("should throw error when not providing a id while bringing a user", async () => {
    await expect(userUseCase.BringUser(undefined)).rejects.toThrowError(
      "must provide a user id"
    );
  });

  test("should throw error when not providing a id while removing a user", async () => {
    await expect(userUseCase.removeUser(undefined)).rejects.toThrowError(
      "must provide a user id"
    );
  });

  test("should throw error when providing a wrong id while removing a user", async () => {
    await expect(userUseCase.removeUser(1)).rejects.toThrowError(
      "user does not exist"
    );
  });

  test("should throw error when not providing a id while editing a user", async () => {
    const post = {
      username: "jest",
      password: "jest"
    };
    await expect(userUseCase.editUser(post)).rejects.toThrowError(
      "must provide user id"
    );
  });

  test("should throw error when providing a wrong id while editing a user", async () => {
    const post = {
      username: "jest",
      password: "jest",
      id: 1
    };
    await expect(userUseCase.editUser(post)).rejects.toThrowError(
      "user does not exist"
    );
  });

  test("should throw error when user already exists", async () => {
    const post = {
      username: "koko",
      password: "1234"
    };

    await expect(userUseCase.AddUser(post)).rejects.toThrowError(
      "user already exist"
    );
  });
});
