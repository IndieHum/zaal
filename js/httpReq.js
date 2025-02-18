export const fetchJSON = async () => {
  const res = await fetch("../data/searchEngines.json");
  const json = await res.json();
  return json;
}
