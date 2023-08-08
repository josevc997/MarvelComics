import {ItemUrl, ItemThumbnail, Collection, ItemInfoWithRole, ItemInfoWithType, ItemInfo} from './response'

export interface Serie {
    id: number;
    title: string;
    description: string;
    resourceURI: string;
    urls: ItemUrl[];
    startYear: number;
    endYear: number;
    rating: string;
    type: string;
    modified: string;
    thumbnail: ItemThumbnail;
    creators: Collection<ItemInfoWithRole>
    characters: Collection<ItemInfo>
    stories: Collection<ItemInfoWithType>
    comics: Collection<ItemInfo>
    events: Collection<ItemInfo>
    next: ItemInfo
    previous: ItemInfo
}

export interface Storie {
    id: number;
    title: string;
    description: string;
    resourceURI: string;
    type: string;
    modified: string;
    thumbnail: ItemThumbnail;
    creators: Collection<ItemInfoWithRole>
    characters: Collection<ItemInfo>
    series: Collection<ItemInfo>
    comics: Collection<ItemInfo>
    events: Collection<ItemInfo>
}

export interface Event {
    id: number;
    title: string;
    description: string;
    resourceURI: string;
    urls: ItemUrl[];
    modified: string;
    start: string;
    end: string;
    thumbnail: ItemThumbnail;
    creators: Collection<ItemInfoWithRole>
    characters: Collection<ItemInfo>
    stories: Collection<ItemInfoWithType>
    comics: Collection<ItemInfo>
    series: Collection<ItemInfo>
    next: ItemInfo
    previous: ItemInfo

}

