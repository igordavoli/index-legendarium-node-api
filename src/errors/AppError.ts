export class AppError {
  public readonly errorMessage: string;
  public readonly statusCode: number;

  constructor(error: string, status = 500) {
    console.log(error)
    this.errorMessage = error;
    this.statusCode = status;
  }
}