function hideSearch() {
    document.getElementById("search-form-id").style.display = "none";
}
function showSearch() {
    document.getElementById("checkbox").checked = false;
    document.getElementById("search-form-id").style.display = "block";
}

const searchInput = document.getElementById("searcher-field");
const searchButton = document.getElementById("searcher-submit");

searchButton.addEventListener("click", recordSearch);
searchInput.addEventListener("keyup", PressedEnter);

function PressedEnter(ev) {
    if (ev.keyCode === 13) {
        searchButton.click();
    }
}

function recordSearch() {
    localStorage.setItem('result', searchInput.value);
}