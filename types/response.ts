export interface CustomResponse<T> {
  attributionHTML: string;
  attributionText: string;
  code: number;
  data: T;
  etag: string;
  status: string;
}
