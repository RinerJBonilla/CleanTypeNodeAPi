import DConnection from "../database";
import Postdb from "./post.db";
import { Post } from "../entities/post";

let dConn: DConnection;
let pDB: Postdb;

beforeAll(() => {
  dConn = new DConnection();
  pDB = new Postdb(dConn);
});

afterAll(async () => {
  await dConn.Close();
});

describe("Post DB", () => {
  test("should bring all posts", async () => {
    const posts = await pDB.getPosts();
    expect(posts).toHaveLength(11);
  });

  test("should bring Post. 5", async () => {
    const post = await pDB.getPost(5);
    expect(post.id).toBe(5);
  });

  test("should create Post", async () => {
    const post = new Post("jest", "jest", "jest", 5);
    const repost = await pDB.insertPost(post);
    expect(repost.title).toEqual("jest");
    expect(repost.id).toBeDefined();
  });

  test("should edit Post", async () => {
    const post = new Post("jest2", "jest2", "jest2", 11, 16);
    const repost = await pDB.putPost(post);
    expect(repost.title).toEqual("jest2");
    expect(repost.description).toEqual("jest2");
  });

  test("should delete Post", async () => {
    const title = "jest";
    const repost = await pDB.deletePostTest(title);
    expect(repost).toEqual("jest");
  });

  test("should not bring anything when not finding a post", async () => {
    const post = await pDB.getPost(1);
    expect(post).toBeFalsy();
  });
});
