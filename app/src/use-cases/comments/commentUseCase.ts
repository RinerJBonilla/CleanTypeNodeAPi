import { Comment } from "../../entities/comment";
import CommentDB from "../../data-access/comment.db";

export default class CommentUseCase {
  private db: CommentDB;

  constructor(commentDB: CommentDB) {
    this.db = commentDB;
  }

  async BringAllComments() {
    try {
      const comments = await this.db.getComments();
      return comments;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async BringMyComments(postId: any) {
    try {
      const res = await this.db.findPostById(Number(postId));
      if (!res) {
        throw Error("post does not exist");
      }
      const comments = await this.db.getMyComments(Number(postId));
      return comments;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async BringMyComment(postId: any, commentId: any) {
    try {
      const res = await this.db.findPostById(Number(postId));
      if (!res) {
        throw Error("post does not exist");
      }
      const comment = await this.db.getComment(Number(commentId));
      return comment;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async AddComment(CommentInfo: any) {
    try {
      const res2 = await this.db.findPostById(Number(CommentInfo.postid));
      if (!res2) {
        throw Error("post does not exist");
      }

      const res = await this.db.findUserById(Number(CommentInfo.userid));
      if (!res) {
        throw Error("user does not exist");
      }

      let eComment = new Comment(
        CommentInfo.message,
        CommentInfo.postid,
        CommentInfo.userid
      );

      return this.db.insertComment(eComment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async EditMyComment(CommentInfo: any) {
    try {
      const res2 = await this.db.findPostById(Number(CommentInfo.postid));
      if (!res2) {
        throw Error("post does not exist");
      }

      const res = await this.db.getComment(Number(CommentInfo.id));
      if (!res) {
        throw Error("comment does not exist");
      }

      let eComment = new Comment(
        CommentInfo.message,
        CommentInfo.postid,
        CommentInfo.userid,
        CommentInfo.id
      );

      return this.db.putComment(eComment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async RemoveCommentTest(message: string) {
    try {
      return this.db.deleteCommentTest(message);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async RemoveComment(commentInfo: any) {
    try {
      const res2 = await this.db.findPostById(Number(commentInfo.postid));
      if (!res2) {
        throw Error("post does not exist");
      }

      const res = await this.db.getComment(Number(commentInfo.id));
      if (!res) {
        throw Error("comment does not exist");
      }
      let eComment = new Comment(
        "commentInfo.message",
        commentInfo.postid,
        commentInfo.userid,
        commentInfo.id
      );

      return this.db.deleteComment(
        eComment.id ? eComment.id : 0,
        eComment.userid
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
