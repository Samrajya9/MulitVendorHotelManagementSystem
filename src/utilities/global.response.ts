export default class GlobalResponse<T> {
  success: boolean;
  data: T | null;
  error: { message: string; description?: string; path: string } | null;

  constructor(
    success: boolean,
    data: T | null,
    error: { message: string; description?: string; path: string } | null,
  ) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T): GlobalResponse<T> {
    return new GlobalResponse<T>(true, data, null);
  }

  static failure<T>(
    message: string,
    description: string,
    path: string,
  ): GlobalResponse<T> {
    return new GlobalResponse<T>(false, null, { message, description, path });
  }
}
