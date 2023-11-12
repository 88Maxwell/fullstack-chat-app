import { services } from "app/store";

export interface ServicesProvidersProps {
  services: typeof services;
  children: React.ReactNode;
}
