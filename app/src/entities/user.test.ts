import { User } from "./user";
import { Post } from "./post";

describe("User", () => {
  test("should not create user from undefined", () => {
    const userInfo: any = undefined;
    expect(() => new User(userInfo, userInfo)).toThrow(
      "User must have username"
    );
  });

  test("should not create user without username", () => {
    const newUser = {
      username: "",
      password: "1234"
    };
    expect(() => new User(newUser.username, newUser.password)).toThrow(
      "User must have username"
    );
  });

  test("should not create user without password", () => {
    const newUser = {
      username: "dummy",
      password: ""
    };
    expect(() => new User(newUser.username, newUser.password)).toThrow(
      "User must have password"
    );
  });

  test("should create the user just without id fine", () => {
    const newUser = {
      username: "dummy",
      password: "1234"
    };
    const poster = new User(newUser.username, newUser.password);
    expect(poster).toBeDefined();
  });

  test("should create the user just with id fine", () => {
    const newUser = {
      username: "dummy",
      password: "1234",
      id: 1
    };
    const poster = new User(newUser.username, newUser.password, newUser.id);
    expect(poster).toBeDefined();
  });

  test("should every value of user after being created", () => {
    const poster = new User("dummy", "1234", 1);
    expect(poster).toBeDefined();
    expect(poster.getUsername()).toEqual("dummy");
    expect(poster.getPassword()).toEqual("1234");
    expect(poster.getId()).toBe(1);
  });

  test("should be able to set id of user", () => {
    const poster = new User("dummy", "1234", 1);
    expect(poster).toBeDefined();
    poster.setId(2);
    expect(poster.getId()).toBe(2);
  });
});
