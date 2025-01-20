export function PageChange(event) {
    const SelectedLanguage = event.target.value;
    switch (SelectedLanguage) {
        case "fa":
            window.location.assign("../../index.html");
            break;
        case "en":
            window.location.assign("../index-en.html");
            break;
        default:
            return;
    }
}