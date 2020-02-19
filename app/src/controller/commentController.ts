import { Request, Response } from "express";
import CommentUseCase from "../use-cases/comments/commentUseCase";

export default class CommentController {
  private commentService: CommentUseCase;

  constructor(postService: CommentUseCase) {
    this.commentService = postService;
  }

  getComment = async (req: Request, res: Response) => {
    try {
      const comment = await this.commentService.BringMyComment(
        req.params.id,
        req.params.commentid
      );
      if (!comment) {
        return res.status(400).json({ message: "comment not found" });
      }
      return res.json(comment);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  getComments = async (req: Request, res: Response): Promise<Response> => {
    try {
      const comments = await this.commentService.BringAllComments();
      return res.json(comments);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  getMyComments = async (req: Request, res: Response): Promise<Response> => {
    try {
      const comments = await this.commentService.BringMyComments(req.params.id);
      return res.json(comments);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  createComment = async (req: Request, res: Response) => {
    try {
      const mess = {
        message: req.body.message,
        userid: res.locals.payload.id,
        postid: req.params.id
      };
      const rep = await this.commentService.AddComment(mess);
      console.log(rep);
      return res.json({ message: "comment created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  updateComment = async (req: Request, res: Response): Promise<Response> => {
    try {
      const mess = {
        message: req.body.message,
        userid: res.locals.payload.id,
        postid: req.params.id,
        id: req.params.commentid
      };
      const rep = await this.commentService.EditMyComment(mess);
      console.log(rep);
      return res.json({ message: "comment updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  deleteComment = async (req: Request, res: Response): Promise<Response> => {
    try {
      const mess = {
        message: req.body.message,
        userid: res.locals.payload.id,
        postid: req.params.id,
        id: req.params.commentid
      };
      const rep = await this.commentService.RemoveComment(mess);
      console.log(rep);
      return res.json({ message: "comment deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  deleteCommentTest = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const rep = await this.commentService.RemoveCommentTest(req.body.message);
      console.log(rep);
      return res.json({ message: "comment deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };
}
