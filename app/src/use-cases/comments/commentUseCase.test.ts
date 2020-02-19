import DConnection from "../../database";
import Commentdb from "../../data-access/comment.db";
import CommentUseCase from "./commentUseCase";

let dConn: DConnection;
let pDB: Commentdb;
let comUseCase: CommentUseCase;

beforeAll(() => {
  dConn = new DConnection();
  pDB = new Commentdb(dConn);
  comUseCase = new CommentUseCase(pDB);
});

afterAll(async () => {
  await dConn.Close();
});

describe("Comment use case", () => {
  test("should bring a comment", async () => {
    const comment = await comUseCase.BringMyComment(8, 5);
    expect(comment.message).toEqual("Great Post <3");
    expect(comment.id).toBe(5);
  });

  test("should bring all 21 comments", async () => {
    const comments = await comUseCase.BringAllComments();
    expect(comments).toHaveLength(21);
  });

  test("should bring all 5 comments from post 8", async () => {
    const comments = await comUseCase.BringMyComments(8);
    expect(comments).toHaveLength(5);
  });

  test("should create a comment", async () => {
    const newComment = {
      message: "jest",
      userid: 5,
      postid: 8
    };
    const res = await comUseCase.AddComment(newComment);
    expect(res.id).toBeDefined();
    expect(res.message).toEqual("jest");
  });

  test("should edit a commnet", async () => {
    const newComment = {
      message: "jest5",
      userid: 10,
      postid: 16,
      id: 26
    };
    const res = await comUseCase.EditMyComment(newComment);
    expect(res.id).toBeDefined();
    expect(res.message).toEqual("jest5");
  });

  test("should remove a comment", async () => {
    const res = await comUseCase.RemoveCommentTest("jest");
    expect(res).toEqual("jest");
  });

  test("should throw error when post does not exist", async () => {
    await expect(comUseCase.BringMyComments(1)).rejects.toThrowError(
      "post does not exist"
    );
  });

  test("should throw error when post does not exist", async () => {
    await expect(comUseCase.BringMyComment(1, 1)).rejects.toThrowError(
      "post does not exist"
    );
  });

  test("should throw error while creating a comment with no post", async () => {
    const newComment = {
      message: "jest5",
      userid: 10,
      postid: 1
    };
    await expect(comUseCase.AddComment(newComment)).rejects.toThrowError(
      "post does not exist"
    );
  });

  test("should throw error while creating a comment with no user", async () => {
    const newComment = {
      message: "jest5",
      userid: 1,
      postid: 16
    };
    await expect(comUseCase.AddComment(newComment)).rejects.toThrowError(
      "user does not exist"
    );
  });

  test("should not edit a commnet when post does not exist", async () => {
    const newComment = {
      message: "jest5",
      userid: 10,
      postid: 1,
      id: 26
    };
    await expect(comUseCase.EditMyComment(newComment)).rejects.toThrowError(
      "post does not exist"
    );
  });

  test("should not edit a commnet when user does not exist", async () => {
    const newComment = {
      message: "jest5",
      userid: 1,
      postid: 16,
      id: 26
    };
    await expect(comUseCase.EditMyComment(newComment)).rejects.toThrowError(
      "user does not own comment"
    );
  });

  test("should not delete a commnet when post does not exist", async () => {
    const newComment = {
      message: "jest5",
      userid: 10,
      postid: 1,
      id: 26
    };
    await expect(comUseCase.RemoveComment(newComment)).rejects.toThrowError(
      "post does not exist"
    );
  });

  test("should not delete a commnet when user does not exist", async () => {
    const newComment = {
      message: "jest5",
      userid: 1,
      postid: 16,
      id: 26
    };
    await expect(comUseCase.RemoveComment(newComment)).rejects.toThrowError(
      "user does not own comment"
    );
  });
});
