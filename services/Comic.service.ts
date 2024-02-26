class ComicService {
    async fetchComicList(offset: number = 0, name: string = "") {
        let url =
            "https://gateway.marvel.com:443/v1/public/comics?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20";
        if (offset > 0) {
            url += `&offset=${offset}`;
        }
        if (name !== "") {
            url += `&titleStartsWith=${name}`;
        }
        const response = await useFetch(url);
        if (response.status.value === "error") {
            throw "Error fetching comic list";
        }
        return response.data.value;
    }

    async fetchComicById(id: number) {
        let url = `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
        const response = await useFetch(url);
        if (response.status.value === "error") {
            throw "Error fetching comic by id";
        }
        return response.data.value;
    }

    async fetchCharactersByComicId(id: number) {
        let url = `https://gateway.marvel.com:443/v1/public/comics/${id}/characters?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
        const response = await useFetch(url);

        if (response.status.value === "error") {
            throw "Error fetching characters by comic id";
        }
        return response.data.value;
    }

    async fetchSeriesByComicId(id: number) {
        let url = `https://gateway.marvel.com:443/v1/public/comics/${id}/series?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
        const response = await useFetch(url);

        if (response.status.value === "error") {
            throw "Error fetching series by comic id";
        }
        return response.data.value;
    }

    async fetchStoriesByComicId(id: number) {
        let url = `https://gateway.marvel.com:443/v1/public/comics/${id}/stories?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
        const response = await useFetch(url);

        if (response.status.value === "error") {
            throw "Error fetching stories by comic id";
        }
        return response.data.value;
    }

    async fetchEventsByComicId(id: number) {
        let url = `https://gateway.marvel.com:443/v1/public/comics/${id}/events?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
        const response = await useFetch(url);

        if (response.status.value === "error") {
            throw "Error fetching events by comic id";
        }
        return response.data.value;
    }
}

export default new ComicService();
