class CharacterService {
  async fetchCharacterList(offset: number = 0) {
    let url =
      "https://gateway.marvel.com:443/v1/public/characters?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20";
    if (offset > 0) {
      url += `&offset=${offset}`;
    }
    const response = await useFetch(url);
    if (response.status.value === "error") {
      throw "Error fetching character list";
    }
    return response.data.value;
  }

  async fetchCharacterById(id: number) {
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
    const response = await useFetch(url);
    if (response.status.value === "error") {
      throw "Error fetching character by id";
    }
    return response.data.value;
  }

  async fetchComicsByCharacterId(id: number) {
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20`;
    const response = await useFetch(url);

    if (response.status.value === "error") {
      throw "Error fetching comics by character id";
    }
    return response.data.value;
  }
}

export default new CharacterService();
