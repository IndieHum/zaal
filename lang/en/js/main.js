// imported functions
import { searching } from "./search.js";
import { metaSearching } from "./metaSearch.js";
import { renderSE } from "./renderSE.js";
import { fetchJSON, fetchMetaJSON } from "./httpReq.js";

// constant variables
const SearchBtn = document.getElementById("search-btn");
const SEContainer = document.getElementById("se-container");
const selectionText = document.getElementById("selection-text");
const selectionInput = document.getElementById("selection");
const metaSelectionInput = document.getElementById("selectionSecond");
const alertSection = document.getElementById("alert");
const MSEContainer = document.getElementById("mse-container");
const TSContainer = document.getElementById("ts-container");
const MSETab = document.getElementById("MSE-tab");
const SETab = document.getElementById("SE-tab");
const TSTab = document.getElementById("TS-tab");
const tsSelectionInput = document.getElementById("ts-selection");
const tsSelectionText = document.getElementById("ts-selection-text");

// variables for managing tabs
let activeTab = "SE"; // current active tab (default: search engines)

// add event listeners for tabs
MSETab.addEventListener("click", () => {
  setActiveTab("MSE");
});

TSTab.addEventListener("click", () => {
  setActiveTab("TS");
});

SETab.addEventListener("click", () => {
  setActiveTab("SE");
});

// function to set active tab
function setActiveTab(tabName) {
  activeTab = tabName;
  console.log(`Active tab: ${activeTab}`);
}

// changable variables
let SEchecked = [];

// TODO: do you know better way?? then help me.
selectionInput.checked = false;
metaSelectionInput.checked = false;
tsSelectionInput.checked = false;

const telegramSearchSources = [
  { id: "telegram-web", fa: "Search the web with domain t.me", url: "https://www.google.com/search?q=site:t.me%20" },
  { id: "telegram-web-2", fa: "Search the web with domain telegram.me", url: "https://www.google.com/search?q=site:telegram.me%20" },
  { id: "telegram-web-3", fa: "Search the web with domain telegram.org", url: "https://www.google.com/search?q=site:telegram.org%20" }
];

const renderTS = () => {
  if (!TSContainer) return;
  TSContainer.innerHTML = telegramSearchSources.map(item => `
    <div>
      <input type="checkbox" id="${item.id}">
      <label for="${item.id}">${item.fa}</label>
    </div>
  `).join("");
};

// TODO: adding selection for meta search engines
const selection = () => {
  let inputs;

  switch (activeTab) {
    case "SE":
      inputs = SEContainer.querySelectorAll("input");
      if (selectionInput.checked) {
        selectionText.innerText = "Deselect All";
        inputs.forEach(e => e.checked = true);
      } else {
        selectionText.innerText = "Select All";
        inputs.forEach(e => e.checked = false);
      }
      break;
    case "MSE":
      inputs = MSEContainer.querySelectorAll("input");
      if (metaSelectionInput.checked) {
        selectionText.innerText = "Deselect All";
        inputs.forEach(e => e.checked = true);
      } else {
        selectionText.innerText = "Select All";
        inputs.forEach(e => e.checked = false);
      }
      break;
    case "TS":
      inputs = TSContainer.querySelectorAll("input");
      if (tsSelectionInput.checked) {
        tsSelectionText.innerText = "Deselect All";
        inputs.forEach(e => e.checked = true);
      } else {
        tsSelectionText.innerText = "Select All";
        inputs.forEach(e => e.checked = false);
      }
      break;
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
  const SearchValue = document.getElementById("search").value;
  SEchecked = [];

  switch (activeTab) {
    case "SE":
      const SEnodes = document.querySelectorAll("input[type='checkbox']");
      SEnodes.forEach(n => {
        if (n.checked == true) SEchecked.push(n);
      });
      if (SEchecked.length == 0) { appAlert("No search engine selected.", "danger"); return; }
      searching(SEchecked, SearchValue);
      break;
    case "MSE":
      const MSEnodes = document.querySelectorAll("input[type='checkbox']");
      MSEnodes.forEach(n => {
        if (n.checked == true) SEchecked.push(n);
      });
      if (SEchecked.length == 0) { appAlert("No meta search engine selected.", "danger"); return; }
      metaSearching(SEchecked, SearchValue);
      break;
    case "TS":
      const TSnodes = TSContainer.querySelectorAll("input[type='checkbox']");
      TSnodes.forEach(n => {
        if (n.checked == true) SEchecked.push(n);
      });
      if (SEchecked.length == 0) { appAlert("No Telegram search option selected.", "danger"); return; }
      SEchecked.forEach(n => {
        const source = telegramSearchSources.find(item => item.id === n.id);
        if (source) {
          window.open(`${source.url}${encodeURIComponent(SearchValue)}`);
        }
      });
      break;
  }
}

async function mainFunc() {
  renderTS();

  // fetching serach engines
  fetchJSON().then(data => {
    renderSE(SEContainer, data);
  }).catch(err => console.log(err))

  // fetching meta search engines
  fetchMetaJSON().then(data => {
    renderSE(MSEContainer, data);
  }).catch(err => console.log(err))

  // searching with button
  SearchBtn.addEventListener("click", searchFunc);
}

document.addEventListener("DOMContentLoaded", mainFunc);
selectionInput.addEventListener("input", selection);
metaSelectionInput.addEventListener("input", selection);
tsSelectionInput.addEventListener("input", selection);
