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

// sudo modal for future
const appAlert = () => {
  if (window.location.href.includes("index.html")) alert("موتور جست‌وجویی انتخاب نشده است.");
  else alert("non search engine has been choosed");
}

const searchFunc = () => {
  const SearchValue = document.getElementById("search").value;
  ShowStatus = NewTabRadio.checked == true ? true : false;

  // temp logs
  console.log(SearchValue)
  console.log(SEnodes)
  console.log(NewWinRadio, NewTabRadio)

  SEchecked = [];
  SEnodes.forEach(n => {
    if (n.checked == true) SEchecked.push(n);
  });
  if (SEchecked.length == 0) appAlert();
  // temp logs
  console.log(SEchecked);

  Searching(SEchecked, SearchValue, ShowStatus);
}

function mainFunc() {
  console.log(event)
  NewTabRadio.checked = true;
  LangToggle.addEventListener("change", PageChange);
  if (event.key === "Enter") searchFunc();
  SearchBtn.addEventListener("click", searchFunc);
}

document.addEventListener("DOMContentLoaded", mainFunc);
