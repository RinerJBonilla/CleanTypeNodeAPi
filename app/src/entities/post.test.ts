import { Post } from "./post";

describe("Post", () => {
  test("should not create post from undefined", () => {
    const postInfo: any = undefined;
    expect(() => new Post(postInfo, postInfo, postInfo, postInfo)).toThrow(
      "Post must have content"
    );
  });

  test("should not create post without title", () => {
    const newPost = {
      title: "",
      content: "content",
      description: "description",
      userid: 5
    };
    expect(
      () =>
        new Post(
          newPost.content,
          newPost.title,
          newPost.description,
          newPost.userid
        )
    ).toThrow("Post must have title");
  });

  test("should not create post without description", () => {
    const newPost = {
      title: "title",
      content: "content",
      description: "",
      userid: 5
    };
    expect(
      () =>
        new Post(
          newPost.content,
          newPost.title,
          newPost.description,
          newPost.userid
        )
    ).toThrow("Post must have description");
  });

  test("should not create post without content", () => {
    const newPost = {
      title: "title",
      content: "",
      description: "description",
      userid: 5
    };
    expect(
      () =>
        new Post(
          newPost.content,
          newPost.title,
          newPost.description,
          newPost.userid
        )
    ).toThrow("Post must have content");
  });

  test("should not create post without userid", () => {
    const postInfo: any = undefined;
    const newPost = {
      title: "title",
      content: "content",
      description: "description"
    };
    expect(
      () =>
        new Post(newPost.content, newPost.title, newPost.description, postInfo)
    ).toThrow("Post must have userid");
  });

  test("should create the post just without id fine", () => {
    const newPost = {
      title: "title",
      content: "content",
      description: "description",
      userid: 1
    };
    const poster = new Post(
      newPost.content,
      newPost.title,
      newPost.description,
      newPost.userid
    );
    expect(poster).toBeDefined();
  });

  test("should create the post with id just fine", () => {
    const newPost = {
      title: "title",
      content: "content",
      description: "description",
      userid: 1,
      id: 1
    };
    const poster = new Post(
      newPost.content,
      newPost.title,
      newPost.description,
      newPost.userid,
      newPost.id
    );
    expect(poster).toBeDefined();
  });

  test("should return every value of post after being created", () => {
    const poster = new Post("content", "title", "description", 1, 1);
    expect(poster).toBeDefined();
    expect(poster.getContent()).toEqual("content");
    expect(poster.getDescription()).toEqual("description");
    expect(poster.getTitle()).toEqual("title");
    expect(poster.getUserid()).toBe(1);
    expect(poster.getId()).toBe(1);
  });

  test("should be able to set id of post", () => {
    const poster = new Post("content", "title", "description", 1, 1);
    expect(poster).toBeDefined();
    poster.setId(2);
    expect(poster.getId()).toBe(2);
  });
});
