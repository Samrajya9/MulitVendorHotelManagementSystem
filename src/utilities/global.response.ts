export default class GlobalResponse<T> {
  success: boolean;

  data: T | null;

  error?: {
    message: string;
    description?: string;
    path: string;
  };

  constructor(
    success: boolean,
    data: T | null,
    error?: { message: string; description: string; path: string },
  ) {
    this.success = success;
    this.data = data;
    if (error) {
      this.error = {
        message: error.message,
        description: error.description,
        path: error.path,
      };
    }
  }

  static success<T>(data: T): GlobalResponse<T> {
    return new GlobalResponse<T>(true, data);
  }

  static failure<T>(
    message: string,
    description: string,
    path: string,
  ): GlobalResponse<T> {
    return new GlobalResponse<T>(false, null, { message, description, path });
  }
}
