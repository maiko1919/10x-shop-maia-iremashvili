// HTTP შეცდომა სტატუსით (მაგ. 404, 500)
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// type guard: არის თუ არა შეცდომა ჩვენი ApiError
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}