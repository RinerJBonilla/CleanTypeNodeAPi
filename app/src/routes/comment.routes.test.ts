import { App } from "../app";
import request from "supertest";
import UserAuth from "../utils/UserAuth";

let app: App;
let userAuth: UserAuth;

beforeAll(() => {
  app = new App();
  userAuth = new UserAuth();
});

describe("Comment Routes", () => {
  test("should bring all 21 comments", async () => {
    const res = await request(app.app)
      .get("/comments")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(21);
  });

  test("should bring all 5 comments from post 8", async () => {
    const res = await request(app.app)
      .get("/posts/8/comments")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(5);
  });

  test("should bring comment 5", async () => {
    const res = await request(app.app)
      .get("/posts/8/comments/5")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    expect(res.status).toEqual(200);
    expect(res.body.id).toBe(5);
  });

  test("should create a comment", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .post("/posts/8/comments")
      .set({
        authtoken: token
      })
      .send({
        message: "jester"
      });
    console.log("CREATE----", res.body.message);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("comment created");
  });

  test("should edit a comment", async () => {
    const token = userAuth.genToken({
      username: "cheezzy2",
      id: 10
    });
    const res = await request(app.app)
      .put("/posts/16/comments/26")
      .set({
        authtoken: token
      })
      .send({
        message: "jester9"
      });
    console.log("CREATE----", res.body.message);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("comment updated");
  });

  test("should eliminate a comment", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .delete("/posts/16/comments/26")
      .set({
        authtoken: token
      })
      .send({
        message: "jester"
      });
    console.log("DELETE----", res.body.message);
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("comment deleted");
  });
});
