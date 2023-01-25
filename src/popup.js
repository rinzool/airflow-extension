// Display/hide html tag
function show(tag) {
    document.getElementById(tag).setAttribute("style", "display: block;");
}

function hide(tag) {
    document.getElementById(tag).setAttribute("style", "display: none;");
}

var currentBrowser = typeof InstallTrigger !== "undefined" ? browser : chrome;

// Get main elements
document.getElementById("open-settings").addEventListener("click", function () {
    var currentBrowser = typeof InstallTrigger !== "undefined" ? browser : chrome;
    currentBrowser.runtime.openOptionsPage(function () {});
});
