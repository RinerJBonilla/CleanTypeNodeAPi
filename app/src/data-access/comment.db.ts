import DConnection from "../database";
import { Comment } from "../entities/comment";
import { CommentUser } from "../entities/CommentUserModel";

export default class Commentdb {
  public conn: DConnection;
  constructor(public connect: DConnection) {
    this.conn = this.connect;
  }

  async insertComment(newComment: Comment) {
    console.log("db access: ", newComment);
    try {
      const qry = `
        INSERT INTO comments set 
          message = :message, 
          postid = :postid, 
          userid = :userid`;

      const response = await this.conn.Query(qry, newComment);
      newComment.id = response.insertId;

      return newComment;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findUserById(userId: number): Promise<boolean> {
    console.log("db access: ", userId);
    try {
      const qry = `
      SELECT 
        id
       FROM users 
      WHERE id = :userId`;

      const posts = await this.conn.Query(qry, { userId });
      if (posts[0]) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findPostById(postId: number): Promise<boolean> {
    console.log("db access: ", postId);
    try {
      const qry = `
      SELECT 
        id
       FROM posts 
      WHERE id = :postId`;

      const posts = await this.conn.Query(qry, { postId });
      if (posts[0]) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getComments(): Promise<Comment[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const comments: Comment[] = await this.conn.Query(
          "select id, message, postid, userid from comments"
        );
        resolve(comments);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getMyComments(postid: number): Promise<CommentUser[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const comments: CommentUser[] = await this.conn.Query(
          "select comments.id, comments.message, users.username from comments inner join users on users.id = comments.userid where comments.postid = :postid",
          { postid }
        );
        resolve(comments);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async getComment(commentId: number): Promise<Comment> {
    console.log("db access: ", commentId);
    try {
      const qry = `
          SELECT 
            id,
            message,
            userid,
            postid
           FROM comments 
          WHERE id = :commentId`;

      const comment = await this.conn.Query(qry, { commentId });
      return comment[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async putComment(eComment: Comment): Promise<Comment> {
    try {
      const comments = await this.conn.Query(
        `update comments set message = :message where id = :id and userid = :userid`,
        eComment
      );
      console.log(comments);
      if (comments.affectedRows === 0) {
        throw Error("user does not own comment");
      }
      return eComment;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteComment(commentId: number, userId: number): Promise<any> {
    try {
      const comments = await this.conn.Query(
        "delete from comments where id = :commentId and userid = :userId",
        { commentId, userId }
      );
      console.log(comments);
      if (comments.affectedRows === 0) {
        throw Error("user does not own comment");
      }
      return commentId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteCommentTest(message: string): Promise<any> {
    try {
      const comments = await this.conn.Query(
        "delete from comments where message = :message",
        { message }
      );
      console.log;
      return message;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
