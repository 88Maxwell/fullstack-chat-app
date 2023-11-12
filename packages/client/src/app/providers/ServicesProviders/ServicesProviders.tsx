import { useMemo } from "react";
import { ServicesContext } from "app/contexts/ServicesContext";
import { ServicesProvidersProps } from "./ServicesProvidersTypes";

function ServicesProviders({ children, services }: ServicesProvidersProps) {
  const memoizedServices = useMemo(() => services, [services]);

  return (
    <ServicesContext.Provider value={memoizedServices}>
      {children}
    </ServicesContext.Provider>
  );
}

export default ServicesProviders;
