import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

export default class ContentMod {
  constructor() {}

  async reviewContent(content: string, type: string) {
    if (process.env.IS_TESTING === "true") {
      return content;
    }
    const data = new FormData();
    data.append("text", content);
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
      console.log(response.data.profanity.matches.length);
      throw Error(
        "ERROR: founded " +
          response.data.profanity.matches.length +
          " profanity violations"
      );
    }
    if (response.data.personal.matches.length > 0) {
      console.log(response.data.personal.matches.length);
      throw Error(
        "ERROR: founded " +
          response.data.profanity.matches.length +
          " personal data violations"
      );
    }
    if (response.data.link.matches.length > 0) {
      console.log(response.data.link.matches.length);
    }
    if (type === "username" && response.data.misleading.matches.length > 0) {
      console.log(response.data.misleading.matches.length);
      throw Error(
        "ERROR: founded " +
          response.data.profanity.matches.length +
          " misleading violations"
      );
    }
  }
}
