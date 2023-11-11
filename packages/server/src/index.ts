import express from "express";
import http from "http";
import cors from "cors";
import { generateRandomUser } from "utils/generateRandomUser";
import { GetChatsParams, GetMeParams } from "@chat-app/types";
import { getChats } from "getChats";
import { users } from "mockData";
import SocketService from "./SocketService";

const app = express();
const PORT = 8002;
const httpServer = http.createServer(app);

const socketService = new SocketService(httpServer);

socketService.connection(() => {

});

socketService.disconnect(() => {

});

socketService.onMessage(() => {

});

app.use(cors());
app.get<GetChatsParams>("/chats", (req, res) => {
  res.send({ chats: getChats(users) });
});

app.get<GetMeParams>("/me", (req, res) => {
  res.send({ user: generateRandomUser(req.params.name) });
});

httpServer.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
