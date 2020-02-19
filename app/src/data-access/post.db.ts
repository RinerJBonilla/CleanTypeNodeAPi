import DConnection from "../database";
import { Post } from "../entities/post";
import { PostData } from "../entities/PostData";

export default class Postdb {
  public conn: DConnection;
  constructor(public connect: DConnection) {
    this.conn = this.connect;
  }

  async insertPost(newPost: Post) {
    console.log("db access: ", newPost);
    try {
      const qry = `
        INSERT INTO posts set 
          title = :title, 
          description = :description, 
          content = :content, 
          userid = :userid`;

      const response = await this.conn.Query(qry, newPost);

      newPost.id = response.insertId;

      return newPost;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findUserById(userId: number): Promise<boolean> {
    console.log("db access: ", userId);
    try {
      const qry = `
      SELECT 
        id
       FROM users 
      WHERE id = :userId`;

      const posts = await this.conn.Query(qry, { userId });
      if (posts[0]) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getPosts(): Promise<Post[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const posts: Post[] = await this.conn.Query(
          "select id, title, description, content, userid from posts"
        );

        resolve(posts);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getMyPosts(userid: number): Promise<Post[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const posts: Post[] = await this.conn.Query(
          "select id, title, description, content, userid from posts where userid= :userid",
          { userid }
        );

        resolve(posts);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async getPost(postId: number): Promise<PostData> {
    try {
      const qry = `
      select users.username, posts.description, posts.title, posts.content, posts.id from posts inner join users on posts.userid = users.id where posts.id = :postId`;

      const posts: PostData[] = await this.conn.Query(qry, { postId });
      return posts[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getMyPost(postId: number, userId: number): Promise<PostData> {
    try {
      const qry = `
      select users.username, posts.description, posts.title, posts.content, posts.id from posts inner join users on posts.userid = users.id where posts.id = :userId`;

      const posts: PostData[] = await this.conn.Query(qry, { postId, userId });
      return posts[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async putPost(ePost: Post): Promise<Post> {
    try {
      const posts = await this.conn.Query(
        `update posts set title = :title, description = :description, content = :content where id = :id and userid = :userid`,
        ePost
      );
      console.log(posts);
      if (posts.affectedRows === 0) {
        throw Error("user does not own post");
      }

      return ePost;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deletePost(postId: number, userId: number): Promise<any> {
    try {
      const posts = await this.conn.Query(
        "delete from posts where id = :postId and userid = :userId",
        { postId, userId }
      );
      console.log(posts);
      if (posts.affectedRows === 0) {
        throw Error("user does not own post");
      }

      return postId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deletePostTest(title: string): Promise<any> {
    try {
      const posts = await this.conn.Query(
        "delete from posts where title = :title",
        { title }
      );
      console.log(posts);
      return title;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
