import UserController from "../controller/userController";
import VerifyToken from "../middlewares/VerifyToken";
import { Router } from "express";
import verififyToken from "../middlewares/VerifyToken";

export default class PostRouter {
  private router: any;

  constructor(userController: UserController) {
    this.router = Router();

    this.router.route("/login").post(userController.loginUser);
    this.router.route("/register").post(userController.registerUser);

    this.router.route("/users").get(verififyToken, userController.getUsers);

    this.router
      .route("/users/:id")
      .get(verififyToken, userController.getUser)
      .put(verififyToken, userController.updateUser)
      .delete(
        verififyToken,
        process.env.IS_TESTING === "true"
          ? userController.deleteUserTest
          : userController.deleteUser
      );
  }

  getRoutes() {
    return this.router;
  }
}
