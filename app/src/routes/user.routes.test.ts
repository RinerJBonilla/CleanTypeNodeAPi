import { App } from "../app";
import request from "supertest";
import UserAuth from "../utils/UserAuth";

let app: App;
let userAuth: UserAuth;

beforeAll(() => {
  app = new App();
  userAuth = new UserAuth();
});

describe("User Routes", () => {
  test("should bring all 4 users", async () => {
    const res = await request(app.app)
      .get("/users")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(4);
  });

  test("should bring user 5", async () => {
    const res = await request(app.app)
      .get("/users/5")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    expect(res.status).toEqual(200);
    expect(res.body.id).toBe(5);
  });

  test("should send message of user not found", async () => {
    const res = await request(app.app)
      .get("/users/1")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    console.log("VIBE CHECK", res.body);
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("user not found");
  });

  test("should create a user", async () => {
    const res = await request(app.app)
      .post("/register")
      .send({
        username: "jest",
        password: "1234"
      });
    console.log("CREATE----", res.body.message);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("user created");
  });

  test("should not create a user when username already exists", async () => {
    const res = await request(app.app)
      .post("/register")
      .send({
        username: "koko",
        password: "1234"
      });
    console.log("CREATE----", res.body.message);
    expect(res.status).toEqual(500);
    expect(res.body.message).toEqual("user already exists");
  });

  test("should login a user", async () => {
    const res = await request(app.app)
      .post("/login")
      .send({
        username: "koko",
        password: "1234"
      });
    console.log("CREATE----", res.body.message);
    expect(res.status).toEqual(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.username).toEqual("koko");
  });

  test("should not login a user when user does not exist", async () => {
    const res = await request(app.app)
      .post("/login")
      .send({
        username: "jestnew",
        password: "1234"
      });
    console.log("CREATE----", res.body.message);
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("user does not exist");
  });

  test("should not login a user when incorrect credentials", async () => {
    const res = await request(app.app)
      .post("/login")
      .send({
        username: "koko",
        password: "69"
      });
    console.log("CREATE----", res.body.message);
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("incorrect credentials");
  });

  test("should edit a user", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .put("/users/5")
      .set({
        authtoken: token
      })
      .send({
        username: "koko",
        password: "1234"
      });
    console.log("EDIT----", res.body.message);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("user updated");
  });

  test("should not edit a user when incorrect credentials", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .put("/users/7")
      .set({
        authtoken: token
      })
      .send({
        username: "koko",
        password: "1234"
      });
    console.log("EDIT----", res.body.message);
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("you're not allowed to edit this user");
  });

  test("should delete user", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .delete("/users/7")
      .set({
        authtoken: token
      })
      .send({
        username: "jest"
      });
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("user deleted");
  });
  test("should not edit a user when incorrect credentials", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .put("/users/7")
      .set({
        authtoken: token
      })
      .send({
        username: "koko",
        password: "1234"
      });
    console.log("EDIT----", res.body.message);
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("you're not allowed to edit this user");
  });
});
