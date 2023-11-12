import { useContext } from "react";
import { ServicesContext } from "../contexts/ServicesContext";

export function useServices() {
  const services = useContext(ServicesContext);

  if (!services) throw new Error("useServices must use with ServicesProvider but It`s not!");

  return services;
}
