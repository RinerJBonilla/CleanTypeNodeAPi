import { App } from "../app";
import request from "supertest";
import UserAuth from "../utils/UserAuth";

let app: App;
let userAuth: UserAuth;

beforeAll(() => {
  app = new App();
  userAuth = new UserAuth();
});

describe("Post Routes", () => {
  test("should bring all 11 posts", async () => {
    const res = await request(app.app)
      .get("/posts")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(11);
  });

  test("should bring post 5", async () => {
    const res = await request(app.app)
      .get("/posts/5")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    expect(res.status).toEqual(200);
    expect(res.body.id).toBe(5);
  });

  test("should send message of post not found", async () => {
    const res = await request(app.app)
      .get("/posts/1")
      .set({
        authtoken: process.env.T_D_TOKEN ? process.env.T_D_TOKEN : "bla"
      });
    console.log("VIBE CHECK", res.body);
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("post not found");
  });

  test("should create a post", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .post("/posts")
      .set({
        authtoken: token
      })
      .send({
        title: "jest1",
        description: "jest1",
        content: "jest1",
        userid: 5
      });
    console.log("CREATE----", res.body.message);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("post created");
  });

  // test("should not create a post with different credentials", async () => {
  //   const token = userAuth.genToken({
  //     username: "cheezzy2",
  //     id: 5
  //   });
  //   const res = await request(app.app)
  //     .post("/posts")
  //     .set({
  //       authtoken: token
  //     })
  //     .send({
  //       title: "jest1",
  //       description: "jest1",
  //       content: "jest1",
  //       userid: 7
  //     });
  //   expect(res.status).toEqual(400);
  //   expect(res.body.message).toEqual(
  //     "ACCESS DENIED: can't create a post with selected user"
  //   );
  // });

  test("should edit a post", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .put("/posts/5")
      .set({
        authtoken: token
      })
      .send({
        title: "jest9",
        description: "jest9",
        content: "jest9",
        userid: 5
      });
    console.log("EDIT----", res.body.message);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("post updated");
  });

  test("should not edit a post with different credentials", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .put("/posts/6")
      .set({
        authtoken: token
      })
      .send({
        title: "jest9",
        description: "jest9",
        content: "jest9",
        userid: 7
      });
    expect(res.status).toEqual(500);
    expect(res.body.message).toEqual("user does not own post");
  });

  test("should eliminate a post", async () => {
    const token = userAuth.genToken({
      username: "koko",
      id: 5
    });
    const res = await request(app.app)
      .delete("/posts/5")
      .set({
        authtoken: token
      })
      .send({
        title: "jest1"
      });
    console.log("DELETE----", res.body.message);
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("post deleted");
  });
});
