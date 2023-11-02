import { ResponseApiOnSucessOrErrorType } from '../../types/response_type.d';

export default class ResponseOnSucessOrError {
  created<DataType, ErrType>(
    data: DataType,
    err: ErrType,
  ): ResponseApiOnSucessOrErrorType<DataType, ErrType> {
    return {
      status: true,
      data,
      error: err,
      codeHttp: 201,
    };
  }

  notFound<DataType, ErrType>(
    err: ErrType,
  ): ResponseApiOnSucessOrErrorType<DataType, ErrType> {
    return {
      status: false,
      data:null,
      error: err,
      codeHttp: 404,
    };
  }

  success<DataType, ErrType>(
    data: DataType,
    err: ErrType,
  ): ResponseApiOnSucessOrErrorType<DataType, ErrType> {
    return {
      status: true,
      data,
      error: err,
      codeHttp: 200,
    };
  }

  badRequest<DataType, ErrType>(
    err: ErrType,
  ): ResponseApiOnSucessOrErrorType<DataType, ErrType> {
    return {
      status: true,
      data: null,
      error: err,
      codeHttp: 404,
    };
  }

  error<ErrType>(error: ErrType): ResponseApiOnSucessOrErrorType<null, ErrType> {
    return {
      status: false,
      data: null,
      error,
      codeHttp: 500,
    };
  }
}
