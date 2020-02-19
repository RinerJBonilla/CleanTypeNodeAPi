import { Request, Response } from "express";
import PostUseCase from "../use-cases/posts/postUseCase";

export default class PostController {
  private postService: PostUseCase;

  constructor(postService: PostUseCase) {
    this.postService = postService;
  }

  getPost = async (req: Request, res: Response) => {
    try {
      console.log("in get post with: ", req.params.id);

      const postId = req.params.id;
      const post = await this.postService.BringPost(postId);
      if (!post) {
        return res.status(400).json({ message: "post not found" });
      }
      return res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  createPost = async (req: Request, res: Response) => {
    console.log("controller: ", req.body);
    try {
      // if (res.locals.payload.id !== Number(req.body.userid)) {
      //   console.log(res.locals.payload.id);
      //   console.log(Number(req.body.userid));
      //   return res.status(400).json({
      //     message: "ACCESS DENIED: can't create a post with selected user"
      //   });
      // }
      req.body["userid"] = res.locals.payload.id;
      const rep = await this.postService.AddPost(req.body);
      console.log(rep);
      return res.json({ message: "post created" });
    } catch (error) {
      console.log("in controller", error);
      return res.status(500).send({ message: error.message });
    }
  };

  deletePost = async (req: Request, res: Response): Promise<Response> => {
    try {
      // if (res.locals.payload.id !== Number(req.body.userid)) {
      //   return res.status(400).json({
      //     message: "ACCESS DENIED: can't delete this post with your credentials"
      //   });
      // }
      const rep = await this.postService.removePost(
        req.params.id,
        res.locals.payload.id
      );
      return res.json({ message: "post deleted", id: rep });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  deletePostTest = async (req: Request, res: Response): Promise<Response> => {
    try {
      const rep = await this.postService.removePostTest(req.body.title);
      return res.json({ message: "post deleted", title: rep });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  updatePosts = async (req: Request, res: Response): Promise<Response> => {
    try {
      // if (res.locals.payload.id !== Number(req.body.userid)) {
      //   return res.status(400).json({
      //     message: "ACCESS DENIED: can't update this post with your credentials"
      //   });
      // }
      req.body["id"] = req.params.id;
      req.body["userid"] = res.locals.payload.id;
      const rep = await this.postService.editPost(req.body);
      return res.json({ message: "post updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  getPosts = async (req: Request, res: Response): Promise<Response> => {
    try {
      const rep = await this.postService.BringAllPost();
      return res.json(rep);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };

  getMyPosts = async (req: Request, res: Response): Promise<Response> => {
    try {
      const rep = await this.postService.BringAllMyPost(req.params.userid);
      return res.json(rep);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };

  getMyPost = async (req: Request, res: Response) => {
    try {
      const postId = req.params.id;
      const userId = req.params.userid;
      const post = await this.postService.BringMyPost(postId, userId);
      if (!post) {
        return res.status(400).json({ message: "post not found" });
      }
      return res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };

  editMyPost = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (res.locals.payload.id !== Number(req.params.userid)) {
        return res.status(400).json({
          message: "ACCESS DENIED: can't update this post with your credentials"
        });
      }
      req.body["id"] = req.params.id;
      const rep = await this.postService.editMyPost(
        req.body,
        res.locals.payload.id
      );
      return res.json({ message: "post updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };

  deleteMyPost = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (res.locals.payload.id !== Number(req.params.userid)) {
        return res.status(400).json({
          message: "ACCESS DENIED: can't delete this post with your credentials"
        });
      }
      const rep = await this.postService.removePost(
        req.params.id,
        res.locals.payload.id
      );
      return res.json({ message: "post deleted", id: rep });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };
}
