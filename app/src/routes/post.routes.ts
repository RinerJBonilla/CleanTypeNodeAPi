import PostController from "../controller/postController";
import VerifyToken from "../middlewares/VerifyToken";
import { Router } from "express";

export default class PostRouter {
  private router: any;

  constructor(postController: PostController) {
    this.router = Router();

    this.router
      .route("/posts")
      .get(VerifyToken, postController.getPosts)
      .post(VerifyToken, postController.createPost);

    this.router
      .route("/posts/:id")
      .get(VerifyToken, postController.getPost)
      .delete(
        VerifyToken,
        process.env.IS_TESTING === "true"
          ? postController.deletePostTest
          : postController.deletePost
      )
      .put(VerifyToken, postController.updatePosts);

    this.router
      .route("/users/:userid/posts")
      .get(VerifyToken, postController.getMyPosts);

    this.router
      .route("/users/:userid/posts/:id")
      .get(VerifyToken, postController.getMyPost)
      .put(VerifyToken, postController.editMyPost)
      .delete(VerifyToken, postController.deleteMyPost);
  }

  getRoutes() {
    return this.router;
  }
}
