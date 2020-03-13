import { Request, Response } from "express";
import UserUseCase from "../use-cases/users/userUseCase";
import UserAuth from "../utils/UserAuth";
import ContentMod from "../utils/ContentMod";

export default class UserController {
  private userService: UserUseCase;
  private userAuth: UserAuth;
  private contentMod: ContentMod;

  constructor(userService: UserUseCase) {
    this.userService = userService;
    this.userAuth = new UserAuth();
    this.contentMod = new ContentMod();
  }

  loginUser = async (req: Request, res: Response) => {
    try {
      const exists = await this.userService.FindUser(req.body.username);
      if (!exists) {
        return res.status(400).json({ message: "user does not exist" });
      }
      const valPassword = this.userAuth.comparePass(
        req.body.password,
        exists.password
      );
      if (!valPassword) {
        return res.status(400).json({ message: "incorrect credentials" });
      }
      const token = this.userAuth.genToken({
        username: exists.username,
        id: exists.id
      });
      return res
        .status(200)
        .send({ username: exists.username, id: exists.id, token: token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  registerUser = async (req: Request, res: Response) => {
    try {
      const genPass = this.userAuth.genPassword(req.body.password);
      req.body.password = genPass;
      await this.contentMod.reviewContent(req.body.username, "username");
      const rep = await this.userService.AddUser(req.body);
      console.log(rep);
      return res.json({ message: "user created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      console.log("in get user with: ", req.params.id);

      const userId = req.params.id;
      const user = await this.userService.BringUser(userId);
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  getUserByUsername = async (req: Request, res: Response) => {
    try {
      console.log("in get user with: ", req.params.username);

      const userName = req.params.username;
      const user = await this.userService.FindUser(userName);
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      return res.json({ id: user.id, username: user.username });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const rep = await this.userService.BringAllUsers();
      return res.json(rep);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (res.locals.payload.id !== Number(req.params.id)) {
        return res
          .status(400)
          .json({ message: "you're not allowed to edit this user" });
      }
      await this.contentMod.reviewContent(req.body.username, "username");
      req.body["id"] = req.params.id;
      const genPass = this.userAuth.genPassword(req.body.password);
      req.body.password = genPass;
      const rep = await this.userService.editUser(req.body);
      return res.json({ message: "user updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (res.locals.payload.id !== Number(req.params.id)) {
        return res
          .status(400)
          .json({ message: "you're not allowed to delete this user" });
      }
      const rep = await this.userService.removeUser(req.params.id);
      return res.json({ message: "user deleted", id: rep });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };

  deleteUserTest = async (req: Request, res: Response): Promise<Response> => {
    try {
      const rep = await this.userService.removeUserTest(req.body.username);
      return res.json({ message: "user deleted", id: rep });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };
}
