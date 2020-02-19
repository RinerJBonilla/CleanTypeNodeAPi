import CommentController from "../controller/commentController";
import VerifyToken from "../middlewares/VerifyToken";
import { Router } from "express";

export default class CommentRouter {
  private router: any;

  constructor(commentController: CommentController) {
    this.router = Router();

    this.router
      .route("/comments")
      .get(VerifyToken, commentController.getComments);

    this.router
      .route("/posts/:id/comments")
      .get(VerifyToken, commentController.getMyComments)
      .post(VerifyToken, commentController.createComment);

    this.router
      .route("/posts/:id/comments/:commentid")
      .get(VerifyToken, commentController.getComment)
      .put(VerifyToken, commentController.updateComment)
      .delete(
        VerifyToken,
        process.env.IS_TESTING === "true"
          ? commentController.deleteCommentTest
          : commentController.deleteComment
      );
  }

  getRoutes() {
    return this.router;
  }
}
