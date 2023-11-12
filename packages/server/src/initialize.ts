import express from "express";
import http from "http";
import cors from "cors";
import FakeDatabase from "./FakeDatabase";
import { UserController } from "./domains/user/UserControllers";
import UserModel from "./domains/user/UserModel";
import UserRouter from "./domains/user/userRouter";

import SocketService from "./services/SocketService";

export function initialize(port: number) {
  const app = express();
  const httpServer = http.createServer(app);

  const fakeDb = new FakeDatabase();
  const socketService = new SocketService(httpServer, fakeDb);

  const userModel = new UserModel(fakeDb);
  const userController = new UserController(userModel);
  const userRouter = new UserRouter(userController);

  app.use(cors());
  app.use(userRouter.router);

  socketService.init();
  // eslint-disable-next-line no-console
  httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
