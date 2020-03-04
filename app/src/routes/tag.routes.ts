import TagController from "../controller/tagController";
import VerifyToken from "../middlewares/VerifyToken";
import { Router } from "express";

export default class TagRouter {
  private router: any;

  constructor(tagController: TagController) {
    this.router = Router();

    this.router.route("/tags").get(VerifyToken, tagController.getTags);

    this.router.route("/tags/:name").get(VerifyToken, tagController.getTag);

    this.router
      .route("/posts/:id/tags")
      .get(VerifyToken, tagController.getMyTags)
      .post(VerifyToken, tagController.createTags)
      .delete(
        VerifyToken,
        process.env.IS_TESTING === "true"
          ? tagController.deleteTagsTest
          : tagController.deleteTags
      );
  }

  getRoutes() {
    return this.router;
  }
}
