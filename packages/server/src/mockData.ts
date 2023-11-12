import type { User } from "@chat-app/types";
import { v4 as uuidv4 } from "uuid";

export const botUsers: Record<string, User> = {
  "Echo bot" : {
    id    : uuidv4(),
    name  : "Echo bot",
    email : "echo-bot@some.com",
    bio   : "Lorem ipsum",
  },
  "Reverse bot​" : {
    id    : uuidv4(),
    name  : "Reverse bot​",
    email : "reverse-bot​@some.com",
    bio   : "Lorem ipsum",
  },
  "​Spam bot​" : {
    id    : uuidv4(),
    name  : "​Spam bot​",
    email : "-spam-bot​@some.com",
    bio   : "Lorem ipsum",
  },
  "Ignorebot​" : {
    id    : uuidv4(),
    name  : "Ignorebot​",
    email : "ignorebot​@some.com",
    bio   : "Lorem ipsum",
  },
};
