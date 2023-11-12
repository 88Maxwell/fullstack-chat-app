import { config } from "app/config";
import { ApiService } from "services/ApiService";
import { HttpClient } from "services/httpClient";

export function initializeServices() {
  const httpClient = new HttpClient(config.API_PREFIX, config.API_URL);
  const apiService = new ApiService(httpClient);

  const services = { apiService };

  return services;
}
