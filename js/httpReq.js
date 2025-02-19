export const fetchJSON = async () => {
  const res = await fetch("https://indiehum.github.io/zaal/data/searchEngines.json");
  const json = await res.json();
  return json;
}
