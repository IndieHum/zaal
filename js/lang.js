// temporary code.
export function PageChange(event) {
  const SelectedLanguage = event.target.value;
  switch (SelectedLanguage) {
    case "fa":
      if (window.location.href.includes("/lang/en/"))
        window.location.assign("../../index.html")
      else window.location.reload();
      break;
    case "en":
      if (!window.location.href.includes("/lang/en/"))
        window.location.assign("../lang/en/index.html")
      else window.location.reload();
      break;
  }
}
