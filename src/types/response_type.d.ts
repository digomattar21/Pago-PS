export interface ResponseApiOnSucessOrErrorType<DataType, ErrType> {
    status: boolean;
    data: DataType;
    error: ErrType;
    codeHttp: number;
}