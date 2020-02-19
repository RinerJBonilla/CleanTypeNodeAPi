import { Comment } from "./comment";

describe("Comment", () => {
  test("should not create comment from undefined", () => {
    const commentInfo: any = undefined;
    expect(() => new Comment(commentInfo, commentInfo, commentInfo)).toThrow(
      "must provide a message"
    );
  });

  test("should not create comment without message", () => {
    const newComment = {
      message: "",
      postid: 5,
      userid: 5
    };
    expect(
      () =>
        new Comment(newComment.message, newComment.postid, newComment.userid)
    ).toThrow("must provide a message");
  });

  test("should not create comment without postid", () => {
    const cominfo: any = undefined;
    const newComment = {
      message: "jest",
      userid: 5
    };
    expect(
      () => new Comment(newComment.message, cominfo, newComment.userid)
    ).toThrow("must provide a postid");
  });

  test("should not create comment without postid", () => {
    const cominfo: any = undefined;
    const newComment = {
      message: "jest",
      postid: 5
    };
    expect(
      () => new Comment(newComment.message, newComment.postid, cominfo)
    ).toThrow("must provide a userid");
  });

  test("should create comment without id just fine", () => {
    const comment = new Comment("comment", 5, 5);
    expect(comment).toBeDefined();
  });
  test("should create comment with id just fine", () => {
    const comment = new Comment("comment", 5, 5, 1);
    expect(comment).toBeDefined();
  });

  test("should return every value of comment after being created", () => {
    const comment = new Comment("message", 5, 5, 1);
    expect(comment.getMessage()).toEqual("message");
    expect(comment.getPostId()).toBe(5);
    expect(comment.getUserId()).toBe(5);
    expect(comment.getId()).toBe(1);
  });

  test("should be able to set id of comment", () => {
    const comment = new Comment("message", 5, 5);
    expect(comment).toBeDefined();
    comment.setId(2);
    expect(comment.getId()).toBe(2);
  });
});
