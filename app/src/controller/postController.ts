import { Request, Response } from "express";
import PostUseCase from "../use-cases/posts/postUseCase";
import TagUseCase from "../use-cases/tags/tagUseCase";
import ContentMod from "../utils/ContentMod";
import AlgoliaService from "../utils/AlgoliaService";

export default class PostController {
  private postService: PostUseCase;
  private tagService: TagUseCase;
  private contentMod: ContentMod;
  private algoliaService: AlgoliaService;

  constructor(postService: PostUseCase, tagService: TagUseCase) {
    this.postService = postService;
    this.tagService = tagService;
    this.contentMod = new ContentMod();
    this.algoliaService = new AlgoliaService();
  }

  getPost = async (req: Request, res: Response) => {
    try {
      console.log("in get post with: ", req.params.id);

      const postId = req.params.id;
      const post = await this.postService.BringPost(postId);
      if (!post) {
        return res.status(400).json({ message: "post not found" });
      }

      const tags = await this.tagService.BringMyTags(postId);

      return res.json({
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        username: post.username,
        tags: tags ? tags : []
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  createPost = async (req: Request, res: Response) => {
    console.log("controller: ", req.body);
    try {
      if (!req.body.tags || req.body.tags.length === 0) {
        await this.contentMod.reviewContent(
          req.body.title +
            ", " +
            req.body.description +
            ", " +
            req.body.content,
          "standard"
        );
      } else {
        let check: string = "";
        for (var i = 0; i < req.body.tags.length; i++) {
          check = check.concat(req.body.tags[i].name, ",");
        }
        await this.contentMod.reviewContent(
          req.body.title +
            ", " +
            req.body.description +
            ", " +
            req.body.content +
            ", " +
            check,
          "standard"
        );
      }
      req.body["userid"] = res.locals.payload.id;
      const rep = await this.postService.AddPost(req.body);

      if (!req.body.tags || req.body.tags.length === 0) {
        return res.json({ message: "post created", id: rep });
      }
      //tags
      const rex = await this.tagService.AddTags(
        req.body.tags,
        res.locals.payload.id,
        rep.id
      );

      console.log(rex);
      console.log(rep);

      //add post to Search engine
      req.body["objectID"] = rep.id;
      await this.algoliaService.savePost(req.body);
      return res.json({ message: "post created", id: rep.id });
    } catch (error) {
      console.log("in controller", error);
      return res.status(500).send({ message: error.message });
    }
  };

  deletePost = async (req: Request, res: Response): Promise<Response> => {
    try {
      const rew = await this.tagService.removeAllMyTags(
        req.params.id,
        res.locals.payload.id
      );
      const rep = await this.postService.removePost(
        req.params.id,
        res.locals.payload.id
      );

      //delete it on search engine
      await this.algoliaService.deletePost(req.params.id);
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
      req.body["id"] = req.params.id;
      req.body["userid"] = res.locals.payload.id;

      if (!req.body.createtags || req.body.createtags.length === 0) {
        await this.contentMod.reviewContent(
          req.body.title +
            ", " +
            req.body.description +
            ", " +
            req.body.content,
          "standard"
        );
      } else {
        let check: string = "";
        for (var i = 0; i < req.body.createtags.length; i++) {
          check = check.concat(req.body.createtags[i].name, ",");
        }
        await this.contentMod.reviewContent(
          req.body.title +
            ", " +
            req.body.description +
            ", " +
            req.body.content +
            ", " +
            check,
          "standard"
        );
      }
      const rep = await this.postService.editPost(req.body);

      if (req.body.createtags && req.body.createtags.length > 0) {
        const rex = await this.tagService.AddTags(
          req.body.createtags,
          res.locals.payload.id,
          req.params.id
        );
        console.log(rex);
      }

      if (req.body.removetags && req.body.removetags.length > 0) {
        const rez = await this.tagService.RemoveTags(
          req.body.removetags,
          res.locals.payload.id,
          req.params.id
        );
        console.log(rez);
      }

      //update it on search engine
      await this.algoliaService.updatePost({
        objectID: req.params.id,
        title: req.body.title,
        description: req.body.description
      });

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

  getPostsByTag = async (req: Request, res: Response): Promise<Response> => {
    try {
      const rep = await this.postService.BringPostsByTag(req.params.tag);
      return res.json(rep);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };
}
