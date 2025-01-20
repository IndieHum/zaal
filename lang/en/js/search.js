export function Searching (SEchecked, SearchValue, ShowStatus) {
    console.log(ShowStatus);
    
    const google = "https://www.google.com/search?q=";
    const ddg = "https://duckduckgo.com/";
    const bing = "https://www.bing.com/search?q=";
    const wiki = "https://en.wikipedia.org/wiki/";
    
    const searchTemple = (SE) => {
        if (ShowStatus) window.open(`${SE}${SearchValue}`);
        else window.open(`${SE}${SearchValue}`,
            `${SearchValue}`,
            "width=800,height=600,top=100,left=100"
        )
    }
    
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
        }
    });
}