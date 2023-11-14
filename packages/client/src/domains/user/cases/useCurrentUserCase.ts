import { User } from "@chat-app/types";
import useLocalStorage from "../hooks/useLocalStorage";

export function useCurrentUserCase() {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  return {
    state   : { user },
    actions : { setUser },
  };
}
