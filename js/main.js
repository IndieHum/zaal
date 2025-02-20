// imported functions
import { Searching } from "./search.js";
import { renderSE } from "./renderSE.js";
import { fetchJSON } from "./httpReq.js";

// constant variables
const SearchBtn = document.getElementById("search-btn");
const SEContainer = document.getElementById("se-container");
const selectionText = document.getElementById("selection-text");
const selectionInput = document.getElementById("selection");

// changable variables
let SEchecked = [];

// TODO: do you know better way?? then help me.
selectionInput.checked = false;

const selection = () => {
  const inputs = SEContainer.querySelectorAll("input");

  if (selectionInput.checked) {
    selectionText.innerText = "پادگزینش همه";
    inputs.forEach(e => e.checked = true);
  } else {
    selectionText.innerText = "گزینشه همه";
    inputs.forEach(e => e.checked = false);
  }
}

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

  // searching with enter
  if (event.key === "Enter") searchFunc();
  // searching with button
  SearchBtn.addEventListener("click", searchFunc);
}

document.addEventListener("DOMContentLoaded", mainFunc);
selectionInput.addEventListener("input", selection);