export interface CustomResponse<T> {
  attributionHTML: string;
  attributionText: string;
  code: number;
  data: CustomData<T>;
  etag: string;
  status: string;
}

export interface CustomData<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

export interface ItemInfo {
  resourceURI: string;
  name: string;
}

export interface ItemInfoWithType extends ItemInfo {
  type: string;
}

export interface ItemInfoWithRole extends ItemInfo {
  role: string;
}

export interface ItemUrl {
  type: string;
  url: string;
}

export interface ItemDate {
  type: string;
  date: string;
}

export interface ItemPrice {
  type: string;
  price: number;
}

export interface ItemThumbnail {
  path: string;
  extension: string;
}

export interface Collection<T> {
  available: number;
  returned: number;
  collectionURI: string;
  items: T[];
}