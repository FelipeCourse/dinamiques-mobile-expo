interface ApiResponseBaseModel {
  statusCode: number;
  message?: string;
  error?: string;
}

export type ApiResponseModel = ApiResponseBaseModel;

export interface ApiResponseWithDataModel<T> extends ApiResponseBaseModel {
  data: T;
}
