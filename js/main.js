// imported functions
import { Searching } from "./search.js";
import { renderSE } from "./renderSE.js";
import { fetchJSON } from "./httpReq.js";

// constant variables
const SearchBtn = document.getElementById("search-btn");
const SEContainer = document.getElementById("se-container");
const selectionText = document.getElementById("selection-text");
const selectionInput = document.getElementById("selection");
const alertSection = document.getElementById("alert");

// changable variables
let SEchecked = [];

// TODO: do you know better way?? then help me.
selectionInput.checked = false;

const selection = () => {
  const inputs = SEContainer.querySelectorAll("input");

  if (selectionInput.checked) {
    selectionText.innerText = "پاد گزینش همه";
    inputs.forEach(e => e.checked = true);
  } else {
    selectionText.innerText = "گزینشه همه";
    inputs.forEach(e => e.checked = false);
  }
}

// TODO: i really have no other idea for this!!
// for naming class: type must be "danger" or "success",
const appAlert = (message, type) => {
  SearchBtn.disabled = true;

  alertSection.innerText = message;
  alertSection.classList.add(`alert-${type}`);
  setTimeout(() => {
    alertSection.innerText = "";
    alertSection.classList.remove(`alert-${type}`);

    SearchBtn.disabled = false;
  }, 3000);
}

const searchFunc = () => {
  const SEnodes = document.querySelectorAll("input[type='checkbox']");
  const SearchValue = document.getElementById("search").value;

  SEchecked = [];
  SEnodes.forEach(n => {
    if (n.checked == true) SEchecked.push(n);
  });
  if (SEchecked.length == 0) { appAlert("موتور جست‌وجویی انتخاب نشده است.", "danger"); return; }
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