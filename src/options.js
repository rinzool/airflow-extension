// Get DOM elements
const successAlert = document.getElementById("success-alert");
const dagsTextArea = document.getElementById("dags");
const hightlightStyleInput = document.getElementById("highlight-dag-style");
const prodUrls = document.getElementById("prod-urls");
const prodUrlColor = document.getElementById("prod-color");
const stagingUrls = document.getElementById("staging-urls");
const stagingUrlColor = document.getElementById("staging-color");
const colorblindOption = document.getElementById("colorblind-option");
const colorNavbars = document.getElementById("color-navbars")

const defaultHighlightStyle = "background: lightgoldenrodyellow; font-weight: bold;";

const defaultProdColor = "#e06551";
const defaultStagingColor = "#6693be";

const defaultTasksColors = [
    { state: "success", color: "#448102" },
    { state: "running", color: "#7ae11d" },
    { state: "up_for_retry", color: "#ffd700" },
    { state: "scheduled", color: "#d2b48c" },
    { state: "deferred", color: "#9370db" },
    { state: "failed", color: "#ed4c1a" },
    { state: "upstream_failed", color: "#f7a400" },
    { state: "queued", color: "#808080" },
    { state: "up_for_reschedule", color: "#67e1d0" },
    { state: "skipped", color: "#f5bfcb" },
    { state: "no_status", color: "#ffffff" },
];

var currentBrowser = typeof InstallTrigger !== "undefined" ? browser : chrome;

// Fetch stored dags
currentBrowser.storage.sync.get("dags", function (data) {
    dagsTextArea.value = data.dags ? data.dags : "";
});

currentBrowser.storage.sync.get("highlightStyle", function (data) {
    hightlightStyleInput.value = data.highlightStyle ? data.highlightStyle : defaultHighlightStyle;
});

currentBrowser.storage.sync.get("prodUrl", function (data) {
    prodUrls.value = data.prodUrl ? data.prodUrl.urls : "";
    prodUrlColor.value = data.prodUrl ? data.prodUrl.color : defaultProdColor;
});

currentBrowser.storage.sync.get("stagingUrl", function (data) {
    stagingUrls.value = data.stagingUrl ? data.stagingUrl.urls : "";
    stagingUrlColor.value = data.stagingUrl ? data.stagingUrl.color : defaultStagingColor;
});

currentBrowser.storage.sync.get("colorNavbars", function (data) {

});

currentBrowser.storage.sync.get("colors", function (data) {
    const colors = {};
    for (let i = 0; i < defaultTasksColors.length; i++) {
        colors[defaultTasksColors[i].state] = defaultTasksColors[i].color;
    }
    if (data.colors) {
        for (let i = 0; i < data.colors.length; i++) {
            colors[data.colors[i].state] = data.colors[i].color;
        }
    }
    displayColorsForm(colors);
});

// Display form
function displayColorsForm(colors) {
    const parentDiv = document.getElementById("colors");
    const keys = Object.keys(colors);
    for (let i = 0; i < keys.length; i++) {
        const color = { state: keys[i], color: colors[keys[i]] };

        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");

        const input = document.createElement("input");
        input.setAttribute("type", "color");
        input.setAttribute("name", "color-" + color.state);
        input.setAttribute("id", "color-" + color.state);
        input.setAttribute("value", color.color);

        cell1.appendChild(document.createTextNode("Task " + color.state));
        cell2.appendChild(input);

        row.appendChild(cell1);
        row.appendChild(cell2);

        parentDiv.appendChild(row);
    }
}

// Update options
function update() {
    hide(successAlert);

    const dags = dagsTextArea.value.split(",").map((dag) => dag.replace(" ", ""));
    const style = hightlightStyleInput.value;
    const prodUrlsValues = prodUrls.value.split(",").map((url) => url.replace(" ", ""));
    const stagingUrlsValues = stagingUrls.value.split(",").map((url) => url.replace(" ", ""));
    const colors = getColors();
    var data = {};
    if (dags) data.dags = dags;
    if (style) data.highlightStyle = style;

    const colorGroups = document.querySelectorAll('#color-navbars tbody tr');
    for(colorGroup of colorGroups ) {
        var id = colorGroup.cells["0"].innerText;
        var name = document.getElementsByName("name"+id)["0"].value;
        var urls = document.getElementsByName("urls"+id)["0"].value.split(",").map((url) => url.replace(" ", ""));
        var color = document.getElementsByName("color"+id)["0"].value
    }

    if (prodUrlsValues) data.prodUrl = { urls: prodUrlsValues, color: prodUrlColor.value };
    if (stagingUrlsValues)
        data.stagingUrl = {
            urls: stagingUrlsValues,
            color: stagingUrlColor.value,
        };
    data.colors = colors;
    currentBrowser.storage.sync.set(data, function () {
        show(successAlert);
        setTimeout(function () {
            hide(successAlert);
        }, 2000);
    });
}

function getColors() {
    let colors = [];

    for (let i = 0; i < defaultTasksColors.length; i++) {
        const state = defaultTasksColors[i].state;
        console.log("color-" + state);
        const color = document.getElementById("color-" + state).value;
        colors.push({ state: state, color: color });
    }

    return colors;
}

// Reset hightlight default style
function resetHightlightDefault() {
    hightlightStyleInput.value = defaultHighlightStyle;
}

function resetColorsDefault() {
    let colors = [];
    currentBrowser.storage.sync.remove("colors");
    for (let i = 0; i < defaultTasksColors.length; i++) {
        const color = defaultTasksColors[i];
        document.getElementById("color-" + color.state).value = color.color;
    }
}

function resetProdColorDefault() {
    prodUrlColor.value = defaultProdColor;
}

function resetStagingColorDefault() {
    stagingUrlColor.value = defaultStagingColor;
}

function addUrlRow() {
    var table = document.getElementById("tab_logic");
    var urlGroupNumber = table.rows.length;

    var newRowHtml = "<td>"+ urlGroupNumber +"</td><td><input name='name"+urlGroupNumber+"' type='text' placeholder='Name' class='form-control input-md'  /> </td><td><input  name='urls"+urlGroupNumber+"' type='text' placeholder='Urls'  class='form-control input-md'></td><td><input  name='color"+urlGroupNumber+"' type='color' placeholder='color'  class='form-control input-md'></td>"

    var newRowTag = document.createElement('tr');
    newRowTag.setAttribute('id', 'group' + urlGroupNumber);
    newRowTag.innerHTML = newRowHtml;

    // Get the table element by its ID and append the new row
    table.appendChild(newRowTag);
}

function deleteUrlRow() {    
    var table = document.getElementById('tab_logic');
    var rowCount = table.rows.length;
    if(rowCount > 2) {
        table.deleteRow(rowCount -1);
    }
}

// Update stored list of dags when validating form

document.getElementById("add-row").addEventListener("click", addUrlRow);

document.getElementById("delete-row").addEventListener("click", deleteUrlRow);

document.getElementById("validate").addEventListener("click", update);

document.getElementById("reset-highlight-default").addEventListener("click", resetHightlightDefault);

document.getElementById("reset-colors-default").addEventListener("click", resetColorsDefault);

document.getElementById("reset-prod-color-default").addEventListener("click", resetProdColorDefault);

document.getElementById("reset-staging-color-default").addEventListener("click", resetStagingColorDefault);

// Basic show/hide functions
function hide(e) {
    e.setAttribute("style", "display: none");
}

function show(e) {
    e.setAttribute("style", "display: block");
}

// Update when enter
document.addEventListener("keypress", function (e) {
    if (e.keyCode == 13) {
        update();
    }
});
