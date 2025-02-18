export function Searching(SEchecked, SearchValue) {

  const google = "https://www.google.com/search?q=";
  const ddg = "https://duckduckgo.com/";
  const bing = "https://www.bing.com/search?q=";
  const wiki = "https://en.wikipedia.org/wiki/Special:Search?search=";
  const yandex = "https://yandex.com/search/?text=";
  const yahoo = "https://search.yahoo.com/search?p=";
  const zbin = "https://zarebin.ir/search?q=";
  const brave = "https://search.brave.com/search?q=";
  const ask = "https://www.ask.com/web?q=";
  const webc = "https://www.webcrawler.com/serp?q=";
  const gerdoo = "https://gerdoo.me/search/?query=";

  const searchTemple = (SE) => window.open(`${SE}${SearchValue}`);

  SEchecked.forEach(n => {
    switch (n.id) {
      case 'google':
        searchTemple(google);
        break;
      case 'ddg':
        searchTemple(ddg);
        break;
      case 'bing':
        searchTemple(bing);
        break;
      case 'wiki':
        searchTemple(wiki);
        break;
      case 'yandex':
        searchTemple(yandex);
        break;
      case 'yahoo':
        searchTemple(yahoo);
        break;
      case 'zbin':
        searchTemple(zbin);
        break;
      case 'brave':
        searchTemple(brave);
        break;
      case 'ask':
        searchTemple(ask);
        break;
      case 'webc':
        searchTemple(webc);
        break;
      case 'gerdoo':
        searchTemple(gerdoo);
        break;
    }
  });
}
