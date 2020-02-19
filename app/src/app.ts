import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { handleAPIDocs } from "./configs/apiDocs";

import DConnection from "./database";

import Postdb from "./data-access/post.db";
import PostUseCase from "./use-cases/posts/postUseCase";
import PostController from "./controller/postController";
import PostRouter from "./routes/post.routes";

import Userdb from "./data-access/user.db";
import UserUseCase from "./use-cases/users/userUseCase";
import UserController from "./controller/userController";
import UserRouter from "./routes/user.routes";

import Commentdb from "./data-access/comment.db";
import CommentUseCase from "./use-cases/comments/commentUseCase";
import CommentController from "./controller/commentController";
import CommentRouter from "./routes/comment.routes";

export class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    dotenv.config();
    this.app.set("port", Number(process.env.PORT) || 3000);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
    handleAPIDocs(this.app);
  }

  routes() {
    //Posts
    const dConnection: DConnection = new DConnection();
    const postDb: Postdb = new Postdb(dConnection);
    const postUseCase: PostUseCase = new PostUseCase(postDb);
    const postController: PostController = new PostController(postUseCase);

    const postRouter: PostRouter = new PostRouter(postController);

    //Users
    const userDb: Userdb = new Userdb(dConnection);
    const userUseCase: UserUseCase = new UserUseCase(userDb);
    const userController: UserController = new UserController(userUseCase);

    const userRouter: UserRouter = new UserRouter(userController);

    //Comments
    const commentDb: Commentdb = new Commentdb(dConnection);
    const commentUseCase: CommentUseCase = new CommentUseCase(commentDb);
    const commentController: CommentController = new CommentController(
      commentUseCase
    );

    const commentRouter: CommentRouter = new CommentRouter(commentController);

    this.app.use(postRouter.getRoutes());
    this.app.use(userRouter.getRoutes());
    this.app.use(commentRouter.getRoutes());
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Server Running On=", this.app.get("port"));
  }
}
