import DConnection from "../database";
import Commentdb from "./comment.db";
import { Comment } from "../entities/comment";

let dConn: DConnection;
let pDB: Commentdb;

beforeAll(() => {
  dConn = new DConnection();
  pDB = new Commentdb(dConn);
});

afterAll(async () => {
  await dConn.Close();
});

describe("Comment DB", () => {
  test("should bring all 21 comments", async () => {
    const comments = await pDB.getComments();
    expect(comments).toHaveLength(21);
  });

  test("should bring comment 5", async () => {
    const comment = await pDB.getComment(5);
    expect(comment.id).toBe(5);
    expect(comment.message).toEqual("Great Post <3");
  });

  test("should bring all 5 comments from post 8", async () => {
    const comments = await pDB.getMyComments(8);
    expect(comments).toHaveLength(5);
  });
});
