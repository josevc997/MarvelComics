export default defineEventHandler(async (event) => {
  console.log("HERE 0");
  const query = getQuery(event);

  const offset = query.offset ? parseInt(query.offset as string) : 0;
  const name = query.name ? (query.name as string) : "";
  let url =
    "https://gateway.marvel.com:443/v1/public/characters?ts=1690982035&apikey=17e1481d6b161d98a641a698ecfbaac2&hash=175d6073f1342a0728f7ec45b6763b84&limit=20";
  if (offset > 0) {
    url += `&offset=${offset}`;
  }
  if (name !== "") {
    url += `&nameStartsWith=${name}`;
  }
  console.log("HERE");

  const response = await $fetch(url);
  console.log("HERE 2", response);
  if (response.status.value === "error") {
    throw "Error fetching character list";
  }
  return response;

  return { a: query.foo, b: query.baz };
});
