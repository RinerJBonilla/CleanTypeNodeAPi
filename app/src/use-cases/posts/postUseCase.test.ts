import DConnection from "../../database";
import Postdb from "../../data-access/post.db";
import PostUseCase from "./postUseCase";

let dConn: DConnection;
let pDB: Postdb;
let postUseCase: PostUseCase;

beforeAll(() => {
  dConn = new DConnection();
  pDB = new Postdb(dConn);
  postUseCase = new PostUseCase(pDB);
});

afterAll(async () => {
  await dConn.Close();
});

describe("Post use case", () => {
  test("should bring a Post", async () => {
    const post = await postUseCase.BringPost(5);
    expect(post.id).toBe(5);
  });

  test("should bring all 11 posts", async () => {
    const posts = await postUseCase.BringAllPost();
    expect(posts).toHaveLength(11);
  });

  test("should create a post", async () => {
    const post = {
      title: "jest",
      description: "jest",
      content: "jest",
      userid: 5
    };
    const repost = await postUseCase.AddPost(post);
    expect(repost.id).toBeDefined();
    expect(repost.title).toEqual("jest");
    expect(repost.userid).toBe(5);
  });

  test("should edit a post", async () => {
    const post = {
      title: "jest3",
      description: "jest3",
      content: "jest3",
      userid: 11,
      id: 16
    };
    const repost = await postUseCase.editPost(post);
    expect(repost.id).toBeDefined();
    expect(repost.title).toEqual("jest3");
    expect(repost.userid).toBe(11);
  });

  test("should remove a Post", async () => {
    const repost = await postUseCase.removePostTest("jest");
    expect(repost).toEqual("jest");
  });

  test("should throw error when not providing a id while bringing a post", async () => {
    await expect(postUseCase.BringPost(undefined)).rejects.toThrowError(
      "must provide a post id"
    );
  });

  test("should throw error when not providing a id while removing a post", async () => {
    await expect(
      postUseCase.removePost(undefined, undefined)
    ).rejects.toThrowError("must provide a post id");
  });

  test("should throw error when providing a wrong id while removing a post", async () => {
    await expect(postUseCase.removePost(1, 1)).rejects.toThrowError(
      "post does not exist"
    );
  });

  test("should throw error when not providing a id while editing a post", async () => {
    const post = {
      title: "jest",
      description: "jest"
    };
    await expect(postUseCase.editPost(post)).rejects.toThrowError(
      "must provide post id"
    );
  });

  test("should throw error when providing a wrong id while editing a post", async () => {
    const post = {
      title: "jest",
      description: "jest",
      id: 1
    };
    await expect(postUseCase.editPost(post)).rejects.toThrowError(
      "post does not exist"
    );
  });

  test("should throw error when not finding the user while adding a post", async () => {
    const post = {
      title: "jest",
      description: "jest",
      content: "jest",
      userid: 1
    };

    await expect(postUseCase.AddPost(post)).rejects.toThrowError(
      "user does not exist"
    );
  });
});
