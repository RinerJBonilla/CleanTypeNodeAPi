import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export default class UserAuth {
  constructor() {}

  private genSalt() {
    return bcrypt.genSaltSync(10);
  }

  genPassword(pass: string) {
    if (!pass || pass.length == 0) {
      throw Error("must provide a password");
    }
    console.log(pass);
    return bcrypt.hashSync(pass, this.genSalt());
  }

  comparePass(passClear: string, passSaved: string) {
    const check = bcrypt.compareSync(passClear, passSaved);
    console.log(check);
    return check;
  }

  genToken(body: any) {
    return jwt.sign(
      { username: body.username, id: body.id },
      process.env.TOKEN_SECRET as string
    );
  }
}
