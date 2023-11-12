import type { User } from "@chat-app/types";
import { v4 as uuidv4 } from "uuid";

const echoBotId = uuidv4();
const reverseBotId = uuidv4();
const spamBotId = uuidv4();
const ignoreBotId = uuidv4();

export const botUsers: Record<string, User> = {
  [echoBotId] : {
    id     : echoBotId,
    name   : "Echo bot",
    email  : "echo-bot@some.com",
    status : "online",
    bio    : "Lorem ipsum",
  },
  [reverseBotId] : {
    id     : reverseBotId,
    name   : "Reverse bot",
    email  : "reverse-bot@some.com",
    status : "online",
    bio    : "Lorem ipsum",
  },
  [spamBotId] : {
    id     : spamBotId,
    name   : "Spam bot",
    email  : "spam-bot​@some.com",
    status : "online",
    bio    : "Lorem ipsum",
  },
  [ignoreBotId] : {
    id     : ignoreBotId,
    name   : "Ignorebot",
    status : "online",
    email  : "ignorebot@some.com",
    bio    : "Lorem ipsum",
  },
};
