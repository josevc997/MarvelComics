interface CustomResponse<T> {
  attributionHTML: string;
  attributionText: string;
  code: number;
  data: CustomData<T>;
  etag: string;
  status: string;
}

interface CustomData<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

interface ItemInfo {
  resourceURI: string;
  name: string;
}

interface ItemInfoWithType extends ItemInfo {
  type: string;
}

interface ItemInfoWithRole extends ItemInfo {
  role: string;
}

interface ItemUrl {
  type: string;
  url: string;
}

interface ItemDate {
  type: string;
  date: string;
}

interface ItemPrice {
  type: string;
  price: number;
}

interface ItemThumbnail {
  path: string;
  extension: string;
}

interface Collection<T> {
  available: number;
  returned: number;
  collectionURI: string;
  items: T[];
}