import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

export default class ContentMod {
  constructor() {}

  removeTags(str: string) {
    //removing span html tags due to mod tool recognizes them as a profanity violation
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/<\/?span[^>]*>/g, "");
  }

  checkNudity(obj: any) {
    console.log("explicit: ", obj.raw);
    console.log("partial: ", obj.partial);
    if (obj.raw > 0.5) {
      throw Error("Explicit NSFW content forbidden");
    }

    if (obj.partial > 0.5) {
      throw Error("Suggestive content forbidden");
    }
  }

  checkOffensive(obj: any) {
    console.log("offensive: ", obj.prob);
    if (obj.prob > 0.5) {
      throw Error("Offensive content forbidden");
    }
  }

  async reviewImages(links: any[]) {
    var sightengine = require("sightengine")(
      process.env.API_USER,
      process.env.API_SECRET
    );
    for (var i = 0; i < links.length; i++) {
      //removing quotes due to mod tool sometimes does not parse the URL correctly
      links[i].match = links[i].match.replace(/['"]+/g, "");
      //checking if an URL has an image format
      var check = links[i].match.split(".");
      if (
        check[check.length - 1].match(/gif/i) ||
        check[check.length - 1].match(/jpe?g/i) ||
        check[check.length - 1].match(/png/i)
      ) {
        var sub = links[i].match.substr(0, 8);
        console.log(sub);
        //checking if the url starts with https:// full link since mod tool sometimes duplicates entries without the https
        if (sub.match(/https?:\/\//i)) {
          console.log("checking this image: " + links[i].match);
          try {
            const response = await sightengine
              .check(["nudity", "offensive"])
              .set_url(links[i].match);
            console.log(response);
            this.checkNudity(response.nudity);
            this.checkOffensive(response.offensive);
          } catch (error) {
            console.log("error in review images: ", error);
            throw Error(error);
          }
        }
      }
    }
  }

  async reviewContent(content: string, type: string) {
    if (
      process.env.IS_TESTING === "true" ||
      !content ||
      content === undefined
    ) {
      return content;
    }
    const data = new FormData();
    data.append("text", this.removeTags(content));
    data.append("lang", "en");
    data.append("mode", type);
    data.append("api_user", process.env.API_USER as string);
    data.append("api_secret", process.env.API_SECRET as string);

    const response = await axios({
      url: "https://api.sightengine.com/1.0/text/check.json",
      method: "post",
      data: data,
      headers: data.getHeaders()
    });
    console.log(response.data);
    console.log(response.data.profanity.matches.length);
    console.log(response.data.personal.matches.length);
    console.log(response.data.link.matches.length);

    if (response.data.profanity.matches.length > 0) {
      console.log(response.data.profanity.matches);
      throw Error(
        "ERROR: found " +
          response.data.profanity.matches.length +
          " profanity violations"
      );
    }
    if (response.data.personal.matches.length > 0) {
      console.log(response.data.personal.matches);
      console.log(
        "WARNING: found " +
          response.data.personal.matches.length +
          " personal data violations"
      );
    }
    if (type === "username" && response.data.misleading.matches.length > 0) {
      console.log(response.data.misleading.matches.length);
      throw Error(
        "ERROR: found " +
          response.data.profanity.matches.length +
          " misleading violations"
      );
    }
    if (response.data.link.matches.length > 0) {
      console.log(response.data.link.matches);
      try {
        await this.reviewImages(response.data.link.matches);
      } catch (error) {
        throw error;
      }
    }
  }
}
