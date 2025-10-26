export default defineEventHandler(async (event) => {
  console.log("HERE 0");
  const query = getQuery(event);

  const offset = query.offset ? parseInt(query.offset as string) : 0;
  const name = query.name ? (query.name as string) : "";
  const runtimeConfig = useRuntimeConfig();
  console.log("HERE 1", runtimeConfig.apikey, "end");
  const baseApiUrl = runtimeConfig.apiurl
  const fullApiKey = `ts=${runtimeConfig.ts}&apikey=${runtimeConfig.apikey}&hash=${runtimeConfig.hash}`
  let url = `${baseApiUrl}characters?${fullApiKey}&limit=20`;
  if (offset > 0) {
    url += `&offset=${offset}`;
  }
  if (name !== "") {
    url += `&nameStartsWith=${name}`;
  }
  console.log("HERE");

  const response = await $fetch(url);
  if (response.status.value === "error") {
    throw "Error fetching character list";
  }
  return response;
});
