import { App } from "../app";
import request from "supertest";
import UserAuth from "../utils/UserAuth";

let app: App;
let userAuth: UserAuth;

beforeAll(() => {
  app = new App();
  userAuth = new UserAuth();
});

describe("Tag Routes", () => {
  test("should bring all 0 tags", async () => {
    const res = await request(app.app)
      .get("/tags")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(0);
  });

  test("should create 3 tags to post 5", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .post("/posts/5/tags")
      .set({
        authtoken: token
      })
      .send([{ name: "food" }, { name: "sushi" }, { name: "japan" }]);
    console.log("CREATE----", res.body.message);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("tags created");
  });

  test("should bring all 3 tags from post 5", async () => {
    const res = await request(app.app)
      .get("/posts/5/tags")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(3);
  });

  test("should search for a non-existing tag", async () => {
    const res = await request(app.app)
      .get("/tags/1")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("tag not found");
  });

  test("should remove all 3 tags from post", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .delete("/posts/5/tags")
      .set({
        authtoken: token
      })
      .send([{ name: "food" }, { name: "sushi" }, { name: "japan" }]);
    console.log("DELETE----", res.body.message);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("tags deleted");
  });
});
