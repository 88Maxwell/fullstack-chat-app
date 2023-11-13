import { User } from "@chat-app/types";
import { v4 as uuidv4 } from "uuid";

const getUser = () => ({
  id     : uuidv4(),
  bio    : uuidv4(),
  name   : `Name-${uuidv4()}`.slice(0, 10),
  email  : "fakemail@fake.mail",
  status : "online",
  avatar : {
    urls : {
      large : "https://dummyimage.com/170x170/bf64bf/fff.jpg",
      small : "https://dummyimage.com/60x60/bf64bf/fff.jpg",
    },
    alt : "Echo bot",
  },
} satisfies User);

export function getFakeUser() {
  try {
    const savedUser = localStorage.getItem("user");
    if (savedUser) return JSON.parse(savedUser);
    const fakeUser = getUser();
    localStorage.setItem("user", JSON.stringify(fakeUser));
    return fakeUser;
  } catch (error) {
    const fakeUser = getUser();
    return fakeUser;
  }
}
