const SearchBtn = document.getElementById("search-btn");
// const SearchValue = document.getElementById("search").value;
const SEnodes = document.querySelectorAll("input[type='checkbox']");

let SEchecked = [];

const searchFunc = () => {
    // check for SE
    const SearchValue = document.getElementById("search").value;
    console.log(SearchValue)
    console.log(SEnodes)
    
    SEchecked = [];
    SEnodes.forEach(n => {
        if (n.checked == true) SEchecked.push(n);
    });
    if (SEchecked.length == 0) alert("موتور جست‌وجویی انتخاب نشده است.");
    
    console.log(SEchecked);
    
    SEchecked.forEach(n => {
        switch (n.id) {
            case 'google':
                // https://www.google.com/search?q=${SearchValue}
                window.open(`https://www.google.com/search?q=${SearchValue}`)
                break;
            case 'ddg':
                // https://duckduckgo.com/${SearchValue}
                window.open(`https://duckduckgo.com/${SearchValue}`)
                break;
            case 'bing':
                // https://www.bing.com/search?q=${SearchValue}
                window.open(`https://www.bing.com/search?q=${SearchValue}`)
                break;
            case 'wiki':
                // https://en.wikipedia.org/wiki/${SearchValue}
                window.open(`https://en.wikipedia.org/wiki/${SearchValue}`)
                break;
        }
    });
}

function mainFunc() {
    SearchBtn.addEventListener("click", searchFunc);
}

document.addEventListener("DOMContentLoaded", mainFunc);