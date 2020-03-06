import { Tag } from "../../entities/tag";
import Tagdb from "../../data-access/tag.db";

export default class TagUseCase {
  private db: Tagdb;

  constructor(tagDb: Tagdb) {
    this.db = tagDb;
  }

  async BringAllTags() {
    try {
      const tags = await this.db.getTags();
      return tags;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async BringMyTags(postId: any) {
    try {
      const res = await this.db.findPostById(Number(postId));
      if (!res) {
        throw Error("post does not exist");
      }
      const tags = await this.db.getMyTags(Number(postId));
      return tags;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async BringTag(name: string) {
    try {
      const res = await this.db.searchTag(name);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async AddTags(tags: any[], userid: any, postid: any) {
    try {
      const ras = await this.db.findPostById(postid);
      if (!ras) {
        throw Error("post does not exist");
      }
      const res = await this.db.checkOwnershipOfPost(userid, postid);
      if (!res) {
        throw Error("cant add tag to this post");
      }

      let tagg: Tag[] = [];
      for (var i = 0; i < tags.length; i++) {
        let check = new Tag(
          tags[i].name,
          postid,
          tags[i].color ? tags[i].color : undefined
        );
        tagg.push(check);
      }

      return this.db.insertTags(tagg);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async removeAllMyTags(postid: any, userid: any) {
    try {
      const ras = await this.db.findPostById(postid);
      if (!ras) {
        throw Error("post does not exist");
      }
      const res = await this.db.checkOwnershipOfPost(userid, postid);
      if (!res) {
        throw Error("cant remove tags to this post");
      }
      return this.db.deleteMyTags(postid);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async RemoveTags(tags: any[], userid: any, postid: any) {
    try {
      const ras = await this.db.findPostById(postid);
      if (!ras) {
        throw Error("post does not exist");
      }
      const res = await this.db.checkOwnershipOfPost(userid, postid);
      if (!res) {
        throw Error("cant remove tags to this post");
      }
      let tagg = [];
      console.log("DEL 2", tags);
      for (var i = 0; i < tags.length; i++) {
        let check = { tagId: tags[i].id, postId: postid };
        tagg.push(check);
      }
      return this.db.deleteTags(tagg);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async RemoveTagsTest(tags: any[]) {
    try {
      return this.db.deleteTagsTest(tags);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
