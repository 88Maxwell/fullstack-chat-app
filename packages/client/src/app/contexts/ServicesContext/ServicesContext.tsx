import { services } from "app/store";
import { createContext } from "react";

export const ServicesContext = createContext<typeof services>(services);
