import { Post } from "../../entities/post";
import PostDB from "../../data-access/post.db";

export default class PostUseCase {
  private db: PostDB;

  constructor(postUseCase: PostDB) {
    this.db = postUseCase;
  }

  async BringPost(postId: any) {
    try {
      if (!postId) {
        throw Error("must provide a post id");
      }

      const post = await this.db.getPost(Number(postId));
      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async BringAllPost() {
    try {
      const posts = await this.db.getPosts();
      return posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async BringAllMyPost(userId: any) {
    try {
      const posts = await this.db.getMyPosts(Number(userId));
      return posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async BringMyPost(postId: any, userId: any) {
    try {
      if (!postId) {
        throw Error("must provide a post id");
      }

      const post = await this.db.getMyPost(Number(postId), Number(userId));
      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async removePost(postId: any, userId: any) {
    try {
      if (!postId) {
        throw Error("must provide a post id");
      }

      const rpost = await this.db.getPost(Number(postId));
      if (!rpost) {
        throw Error("post does not exist");
      }

      const post = await this.db.deletePost(Number(postId), Number(userId));
      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async removePostTest(postTitle: any) {
    try {
      if (!postTitle) {
        throw Error("must provide a post title");
      }

      const post = await this.db.deletePostTest(postTitle);
      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async editPost(PostInfo: any) {
    try {
      if (!PostInfo.id) {
        throw Error("must provide post id");
      }

      const post = await this.db.getPost(Number(PostInfo.id));
      if (!post) {
        throw Error("post does not exist");
      }

      let newPost = new Post(
        PostInfo.content,
        PostInfo.title,
        PostInfo.description,
        PostInfo.userid,
        PostInfo.id
      );

      return this.db.putPost(newPost);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async editMyPost(PostInfo: any, userId: any) {
    try {
      if (!PostInfo.id) {
        throw Error("must provide post id");
      }

      const post = await this.db.getPost(Number(PostInfo.id));
      if (!post) {
        throw Error("post does not exist");
      }

      let newPost = new Post(
        PostInfo.content,
        PostInfo.title,
        PostInfo.description,
        userId,
        PostInfo.id
      );

      return this.db.putPost(newPost);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async AddPost(PostInfo: any) {
    console.log("use case: ", PostInfo);
    try {
      let newPost = new Post(
        PostInfo.content,
        PostInfo.title,
        PostInfo.description,
        PostInfo.userid
      );

      console.log("use case model created: ", newPost);

      const exists = await this.db.findUserById(newPost.userid);
      if (!exists) {
        console.log("got no user");
        throw Error("user does not exist");
      }

      return this.db.insertPost(newPost);
    } catch (error) {
      console.log("in use case: ", error);
      throw error;
    }
  }
}
