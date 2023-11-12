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
    avatar : {
      urls : {
        large : "https://dummyimage.com/170x170/bf64bf/fff.jpg",
        small : "https://dummyimage.com/60x60/bf64bf/fff.jpg",
      },
      alt : "Echo bot",
    },
  },
  [reverseBotId] : {
    id     : reverseBotId,
    name   : "Reverse bot",
    email  : "reverse-bot@some.com",
    status : "online",
    bio    : "Lorem ipsum",
    avatar : {
      urls : {
        large : "https://dummyimage.com/170x170/21cc68/fff.jpg",
        small : "https://dummyimage.com/60x60/21cc68/fff.jpg",
      },
      alt : "Reverse bot",
    },
  },
  [spamBotId] : {
    id     : spamBotId,
    name   : "Spam bot",
    email  : "spam-bot​@some.com",
    status : "online",
    bio    : "Lorem ipsum",
    avatar : {
      urls : {
        large : "https://dummyimage.com/170x170/e9ed00/fff.jpg",
        small : "https://dummyimage.com/60x60/e9ed00/fff.jpg",
      },
      alt : "Spam bot",
    },
  },
  [ignoreBotId] : {
    id     : ignoreBotId,
    name   : "Ignorebot",
    status : "online",
    email  : "ignorebot@some.com",
    bio    : "Lorem ipsum",
    avatar : {
      urls : {
        large : "https://dummyimage.com/170x170/0d786a/fff.jpg",
        small : "https://dummyimage.com/60x60/0d786a/fff.jpg",
      },
      alt : "Ignorebot",
    },
  },
};
