import { config } from "app/config";
import { ApiService } from "services/ApiService";
import { HttpClient } from "services/httpClient";

export function initializeServices() {
  const httpClient = new HttpClient(config.apiPrefix, config.apiUrl);
  const apiService = new ApiService(httpClient);

  const services = { apiService };

  return services;
}
