import { User } from "@chat-app/types";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

const getUser = () => {
  const userName = faker.person.fullName();
  const avatarUrl = faker.internet.avatar();
  const user = {
    id     : uuidv4(),
    bio    : faker.person.bio(),
    type   : "human",
    name   : userName,
    email  : faker.internet.email(),
    status : "online",
    avatar : {
      urls : {
        large : avatarUrl,
        small : avatarUrl,
      },
      alt : userName,
    },
  } satisfies User;

  return user;
};

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
