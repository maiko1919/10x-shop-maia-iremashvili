import { ApiError } from "./ApiError";

// ყველა API მოთხოვნის ერთი "კარიბჭე"
export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(this.baseUrl + path, { signal });

    if (!response.ok) {
      throw new ApiError(response.status, `Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }
}

export const api = new ApiClient("https://dummyjson.com");