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

    async fetchComicsByCharacterId(id: number) {
        let url = `https://gateway.marvel.com:443/v1/public/comics/${id}/comics?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
        const response = await useFetch(url);

        if (response.status.value === "error") {
            throw "Error fetching comics by character id";
        }
        return response.data.value;
    }

    async fetchSeriesByCharacterId(id: number) {
        let url = `https://gateway.marvel.com:443/v1/public/comics/${id}/series?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
        const response = await useFetch(url);

        if (response.status.value === "error") {
            throw "Error fetching series by character id";
        }
        return response.data.value;
    }

    async fetchStoriesByCharacterId(id: number) {
        let url = `https://gateway.marvel.com:443/v1/public/comics/${id}/stories?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
        const response = await useFetch(url);

        if (response.status.value === "error") {
            throw "Error fetching stories by character id";
        }
        return response.data.value;
    }

    async fetchEventsByCharacterId(id: number) {
        let url = `https://gateway.marvel.com:443/v1/public/comics/${id}/events?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
        const response = await useFetch(url);

        if (response.status.value === "error") {
            throw "Error fetching events by character id";
        }
        return response.data.value;
    }
}

export default new ComicService();
