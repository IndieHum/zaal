export function metaSearching(SEchecked, SearchValue) {

  // 1.each variable contain the way for searching with the search engine
  const dogpile = "https://www.dogpile.com/serp?q=";
  const excite = "https://results.excite.com/serp?q=";
  const info = "https://www.info.com/serp?q=";
  const metaCrawler = "https://www.metacrawler.com/serp?q=";
  const searx = "https://searxng.world/search?q=";
  const startpage = "https://www.startpage.com/search?q=";
  const qwant = "https://www.qwant.com/?q=";
  // 3.searching with protocol: {way for searching in SE} + {user searched value}
  const searchTemple = (SE) => window.open(`${SE}${SearchValue}`);

  // 2.checking for each checked item to see wich engine are selected,
  // then call for template to searching.
  SEchecked.forEach(n => {
    switch (n.id) {
      case 'dogpile':
        searchTemple(dogpile);
        break;
      case 'excite':
        searchTemple(excite);
        break;
      case 'info':
        searchTemple(info);
        break;
      case 'meta-crawler':
        searchTemple(metaCrawler);
        break;
      case 'searx':
        searchTemple(searx);
        break;
      case 'startpage':
        searchTemple(startpage);
        break;
      case 'qwant':
        searchTemple(qwant);
        break;
    }
  });
}