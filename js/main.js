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
const MSETab = document.getElementById("MSE-tab");
const SETab = document.getElementById("SE-tab");
const TSTab = document.getElementById("TS-tab");

// متغیرهای مربوط به مدیریت تب‌ها
let activeTab = "SE"; // تب فعال فعلی (پیش‌فرض: موتور جستجو)

// اضافه کردن شنونده رویداد برای تب‌ها
MSETab.addEventListener("click", (event) => {
  setActiveTab("MSE");
});

TSTab.addEventListener("click", (event) => {
  setActiveTab("TS");
});

SETab && SETab.addEventListener("click", (event) => {
  setActiveTab("SE");
});

// تابع برای تنظیم تب فعال
function setActiveTab(tabName) {
  activeTab = tabName;
  console.log(`تب فعال: ${activeTab}`);
}

// changable variables
let SEchecked = [];

// TODO: do you know better way?? then help me.
selectionInput.checked = false;

// TODO: adding selection for meta search engines
const selection = () => {
  let inputs;

  switch (activeTab) {
    case "SE":
      inputs = SEContainer.querySelectorAll("input");
      if (selectionInput.checked) {
        selectionText.innerText = "پاد گزینش همه";
        inputs.forEach(e => e.checked = true);
      } else {
        selectionText.innerText = "گزینشه همه";
        inputs.forEach(e => e.checked = false);
      }
      break;
    case "MSE":
      inputs = MSEContainer.querySelectorAll("input");
      if (metaSelectionInput.checked) {
        selectionText.innerText = "پاد گزینش همه";
        inputs.forEach(e => e.checked = true);
      } else {
        selectionText.innerText = "گزینشه همه";
        inputs.forEach(e => e.checked = false);
      }
      break;
    case "TS":
      // inputs = TSContainer.querySelectorAll("input");
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
      if (SEchecked.length == 0) { appAlert("موتور جست‌وجویی انتخاب نشده است.", "danger"); return; }
      searching(SEchecked, SearchValue);
      break;
    case "MSE":
      const MSEnodes = document.querySelectorAll("input[type='checkbox']");
      MSEnodes.forEach(n => {
        if (n.checked == true) SEchecked.push(n);
      });
      if (SEchecked.length == 0) { appAlert("موتور فرا جست‌وجویی انتخاب نشده است.", "danger"); return; }
      metaSearching(SEchecked, SearchValue);
      break;
    case "TS":
      // const TSnodes = document.querySelectorAll("input[type='checkbox']");
      // TSnodes.forEach(n => {
      //   if (n.checked == true) SEchecked.push(n);
      // });
      // if (SEchecked.length == 0) { appAlert("موتور تلگرامی انتخاب نشده است.", "danger"); return; }
      // searching(SEchecked, SearchValue);
      break;
  }
}

async function mainFunc() {
  // fetching serach engines
  fetchJSON().then(data => {
    renderSE(SEContainer, data);
  }).catch(err => console.log(err))

  // fetching meta search engines
  fetchMetaJSON().then(data => {
    renderSE(MSEContainer, data);
  }).catch(err => console.log(err))

  // searching with enter
  if (event.key === "Enter") searchFunc();
  // searching with button
  SearchBtn.addEventListener("click", searchFunc);
}

document.addEventListener("DOMContentLoaded", mainFunc);
selectionInput.addEventListener("input", selection);
metaSelectionInput.addEventListener("input", selection);