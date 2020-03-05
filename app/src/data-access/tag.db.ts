import DConnection from "../database";
import { Tag } from "../entities/tag";

export default class Tagdb {
  public conn: DConnection;
  constructor(public connect: DConnection) {
    this.conn = this.connect;
  }

  async insertTag(newTag: Tag) {
    console.log("db access: ", newTag);
    try {
      const qry = `
        INSERT INTO tags set 
          name = :name, 
          color = :color, 
          postid = :postid`;

      const response = await this.conn.Query(qry, newTag);
      newTag.id = response.insertId;

      return newTag;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async insertTags(newTag: Tag[]) {
    console.log("db access: ", newTag);
    try {
      const qry = `
        INSERT INTO tags (name,color,postid) VALUES 
          (:name, 
          :color, 
          :postid)`;

      const response = await this.conn.QBatch(qry, newTag);

      return "tags created";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findPostById(postId: number): Promise<boolean> {
    console.log("db access: ", postId);
    try {
      const qry = `
      SELECT 
        id
       FROM posts 
      WHERE id = :postId and deleted = 1`;

      const posts = await this.conn.Query(qry, { postId });
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

  async checkOwnershipOfPost(userid: number, postd: number): Promise<boolean> {
    console.log("db access: ", postd);
    try {
      const qry = `
      SELECT 
        id
       FROM posts 
      WHERE id = :postd and userid = :userid and deleted = 1`;
      const posts = await this.conn.Query(qry, { postd, userid });
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

  getTags(): Promise<Tag[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const tags: Tag[] = await this.conn.Query(
          "select id, name, color, postid from tags"
        );
        resolve(tags);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getMyTags(postid: number): Promise<Tag[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const tags: Tag[] = await this.conn.Query(
          "select id, name, color, postid from tags where postid = :postid",
          { postid }
        );
        resolve(tags);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async searchTag(name: string): Promise<Tag> {
    console.log("db access: ", name);
    try {
      const qry = `
          SELECT DISTINCT
            name,
            id,
            color,
            postid
           FROM tags 
          WHERE name = :name`;

      const tag = await this.conn.Query(qry, { name });
      return tag[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTag(tagId: number): Promise<Tag> {
    console.log("db access: ", tagId);
    try {
      const qry = `
          SELECT 
            id,
            name,
            color,
            postid
           FROM tags 
          WHERE id = :tagId`;

      const tag = await this.conn.Query(qry, { tagId });
      return tag[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteTag(tagId: number, postId: number): Promise<any> {
    try {
      const tags = await this.conn.Query(
        "delete from tags where id = :tagId and postid = :postId",
        { tagId, postId }
      );
      console.log(tags);
      if (tags.affectedRows === 0) {
        throw Error("post does not exist");
      }
      return tagId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteTags(tagIds: any[]): Promise<any> {
    try {
      const tags = await this.conn.QBatch(
        "delete from tags where id = :tagId and postid = :postId",
        tagIds
      );
      console.log(tags);
      if (tags.affectedRows === 0) {
        throw Error("post does not exist");
      }
      return tags;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteMyTags(postid: any): Promise<any> {
    try {
      const tags = await this.conn.Query(
        "delete from tags where postid = :postid",
        { postid }
      );
      console.log(tags);
      if (tags.affectedRows === 0) {
        throw Error("post does not exist");
      }
      return tags;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteTagTest(name: string): Promise<any> {
    try {
      const tags = await this.conn.Query(
        "delete from tags where name = :name",
        { name }
      );
      console.log(tags);
      if (tags.affectedRows === 0) {
        throw Error("user does not own tag");
      }
      return name;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteTagsTest(name: any[]): Promise<any> {
    try {
      const tags = await this.conn.QBatch(
        "delete from tags where name = :name",
        name
      );
      console.log(tags);
      if (tags.affectedRows === 0) {
        throw Error("user does not own tag");
      }
      return "tags deleted";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
