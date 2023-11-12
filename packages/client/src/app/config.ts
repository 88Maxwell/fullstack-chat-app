function getConfig() {
  return {
    apiUrl        : "http://localhost:8002",
    apiPrefix     : "api/v1",
    isDevelopment : process.env?.NODE_ENV === "development",
  };
}

export const config = getConfig();
