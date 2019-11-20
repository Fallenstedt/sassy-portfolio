import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class HttpClient {
  static async get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<string>> {
    const d = await axios.get(url, config);
    return d;
  }
}
