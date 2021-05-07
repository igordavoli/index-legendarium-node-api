export class AppError {
  public readonly errorMessage: string;
  public readonly statusCode: number;

  constructor(error: string, status = 500) {
    this.errorMessage = error;
    this.statusCode = status;
  }
}