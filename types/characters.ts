interface CharacterThumbnail {
  path: string;
  extension: string;
}

interface ItemInfo {
  resourceURI: string;
  name: string;
}

interface CharacterComics {
  available: number;
  collectionURI: string;
  items: ItemInfo[];
  returned: number;
}

interface CharacterSeries {
  available: number;
  collectionURI: string;
  items: ItemInfo[];
  returned: number;
}

interface ItemInfoWithType extends ItemInfo {
  type: string;
}

interface CharacterStories {
  available: number;
  collectionURI: string;
  items: ItemInfoWithType[];
  returned: number;
}

interface CharacterEvents {
  available: number;
  collectionURI: string;
  items: ItemInfo[];
  returned: number;
}

interface CharacterUrls {
  type: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: CharacterThumbnail;
  resourceURI: string;
  comics: CharacterComics;
  series: CharacterSeries;
  stories: CharacterStories;
  events: CharacterEvents;
  urls: CharacterUrls[];
}

export interface characterListResponse {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Character[];
}
