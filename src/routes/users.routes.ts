import { Router } from "express";
import multer from "multer";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import uploadConfig from "../config/upload";
import { UpdateDateColumn } from "typeorm";

const usersRouter = Router();
const uploader = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json({ user: user.name, email: user.email });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  uploader.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
);

export default usersRouter;
