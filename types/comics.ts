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

interface Creators {
  available: number;
  collectionURI: string;
  items: ItemInfoWithRole[];
  returned: number;
}

interface CharacterInfo {
  available: number;
  collectionURI: string;
  items: ItemInfo[];
  returned: number;
}

interface StoriesInfo {
  available: number;
  collectionURI: string;
  items: ItemInfoWithType[];
  returned: number;
}

interface EventsInfo {
  available: number;
  collectionURI: string;
  items: ItemInfo[];
  returned: number;
}

export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string | null;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: any[];
  resourceURI: string;
  urls: ItemUrl[];
  series: ItemInfo;
  variants: any[];
  collections: any[];
  collectedIssues: any[];
  dates: ItemDate[];
  prices: ItemPrice[];
  thumbnail: ItemThumbnail;
  images: ItemThumbnail[];
  creators: Creators;
  characters: CharacterInfo;
  stories: StoriesInfo;
  events: EventsInfo;
}

export interface ComicListResponse {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Comic[];
}
