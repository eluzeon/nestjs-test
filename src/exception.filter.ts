import {  HttpException, HttpStatus } from "@nestjs/common";


export class ExceptionResponse {
  constructor(
    public code: number = 10001,
    public message: string = "Application Exception",
    public status_code: number = HttpStatus.BAD_REQUEST
  ) {}
}


export class AppException extends HttpException {
  constructor(code: number, message?: string, status_code=HttpStatus.BAD_REQUEST) {
    super(new ExceptionResponse(
      code, message, status_code
    ), status_code);
  }
}


// export default class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: AppException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const resp = ctx.getResponse<Response>();
//
//     resp
//       .status(exception.getStatus())
//       .json()
//   }
// }