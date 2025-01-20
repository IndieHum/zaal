import { Searching } from "./search.js";
import { PageChange } from "./lang.js";

const SearchBtn = document.getElementById("search-btn");
const SEnodes = document.querySelectorAll("input[type='checkbox']");
const NewWinRadio = document.getElementById("nwindow");
const NewTabRadio = document.getElementById("ntab");
const LangToggle = document.getElementById("lang-toggle")

let SEchecked = [];
// when it is true: new tab - false: new window
let ShowStatus = true;

const searchFunc = () => {
    const SearchValue = document.getElementById("search").value;
    ShowStatus = NewTabRadio.checked == true ? true : false;

    // temp logs
    console.log(SearchValue)
    console.log(SEnodes)
    console.log(NewWinRadio,NewTabRadio)
    
    SEchecked = [];
    SEnodes.forEach(n => {
        if (n.checked == true) SEchecked.push(n);
    });
    if (SEchecked.length == 0) alert("موتور جست‌وجویی انتخاب نشده است.");
    
    // temp logs
    console.log(SEchecked);
    
    Searching(SEchecked, SearchValue, ShowStatus);
}

function mainFunc() {
    NewTabRadio.checked = true;
    LangToggle.addEventListener("change", PageChange);
    SearchBtn.addEventListener("click", searchFunc);
}

document.addEventListener("DOMContentLoaded", mainFunc);