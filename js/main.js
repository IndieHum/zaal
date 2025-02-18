import { Searching } from "./search.js";
import { PageChange } from "./lang.js";
import { renderSE } from "./renderSE.js";
import { fetchJSON } from "./httpReq.js";

const SearchBtn = document.getElementById("search-btn");
const LangToggle = document.getElementById("lang-toggle");
const SEContainer = document.getElementById("se-container");

let SEchecked = [];

// pseudo modal for future
const appAlert = () => {
  if (window.location.href.includes("index.html")) alert("موتور جست‌وجویی انتخاب نشده است.");
  else alert("non search engine has been choosed");
}

const searchFunc = () => {
  const SEnodes = document.querySelectorAll("input[type='checkbox']");
  const SearchValue = document.getElementById("search").value;

  SEchecked = [];
  SEnodes.forEach(n => {
    if (n.checked == true) SEchecked.push(n);
  });
  console.log(SEchecked);
  console.log(SEnodes);
  if (SEchecked.length == 0) { appAlert(); return; }
  Searching(SEchecked, SearchValue);
}

async function mainFunc() {
  // fetching serach engines
  fetchJSON().then(data => {
    renderSE(SEContainer, data);
  }).catch(err => console.log(err))

  // checking for language change
  LangToggle.addEventListener("change", PageChange);

  // searching with enter
  if (event.key === "Enter") searchFunc();
  // searching with button
  SearchBtn.addEventListener("click", searchFunc);
}

document.addEventListener("DOMContentLoaded", mainFunc);
