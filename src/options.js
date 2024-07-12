// Get DOM elements
const successAlert = document.getElementById("success-alert");
const dagsTextArea = document.getElementById("dags");
const hightlightStyleInput = document.getElementById("highlight-dag-style");
const colorNavbars = document.getElementById("color-navbars")

const defaultHighlightStyle = "background: lightgoldenrodyellow; font-weight: bold;";

const defaultProdColor = "#e06551";
const defaultStagingColor = "#6693be";

var currentBrowser = typeof InstallTrigger !== "undefined" ? browser : chrome;

// Fetch stored dags
currentBrowser.storage.sync.get("dags", function (data) {
    dagsTextArea.value = data.dags ? data.dags : "";
});

currentBrowser.storage.sync.get("highlightStyle", function (data) {
    hightlightStyleInput.value = data.highlightStyle ? data.highlightStyle : defaultHighlightStyle;
});

currentBrowser.storage.sync.get("colorGroups", function (data) {
    var colorGroups = data.colorGroups;
    initColorGroupsTable(colorGroups);
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


function addEmptyUrlRow() {
    const colorGroupsTag = document.getElementById("color-navbars").getElementsByTagName('tbody')[0].rows;
    addUrlRow(colorGroupsTag.length +1);
}


function initColorGroupsTable(colorGroups) {
    if(colorGroups == undefined || colorGroups.length == 0) {
        addEmptyUrlRow();
    } else {
        for (colorGroup of colorGroups) {
            addUrlRow(colorGroup.id, colorGroup.name, colorGroup.urls, colorGroup.color);
        }
    }
}

// Update options
function update() {
    hide(successAlert);

    const dags = dagsTextArea.value.split(",").map((dag) => dag.replace(" ", ""));
    const style = hightlightStyleInput.value;
    var data = {};
    if (dags) data.dags = dags;
    if (style) data.highlightStyle = style;

    const colorGroupsTag = document.getElementById("color-navbars").getElementsByTagName('tbody')[0].rows;
    var colorGroups = []
    for(colorGroupTag of colorGroupsTag) {
        var id = colorGroupTag.cells["0"].innerText;
        var name = document.getElementsByName("name"+id)["0"].value;
        var urls = document.getElementsByName("urls"+id)["0"].value.split(",").map((url) => url.replace(" ", ""));
        var color = document.getElementsByName("color"+id)["0"].value
        var colorGroup = {"id": id, "name": name, "urls": urls, "color": color}
        colorGroups.push(colorGroup)
    }

    data.colorGroups = colorGroups;


    currentBrowser.storage.sync.set(data, function () {
        show(successAlert);
        setTimeout(function () {
            hide(successAlert);
        }, 2000);
    });
}

// Reset hightlight default style
function resetHightlightDefault() {
    hightlightStyleInput.value = defaultHighlightStyle;
}

function addUrlRow(id, name="", urls=[], color="") {
    var table = document.getElementById("color-navbars")
    var lines = table.getElementsByTagName("tbody")[0];

    var newRowHtml = "<td>"+ id +"</td><td><input name='name" + id + "' value='" + name + "' type='text' placeholder='Name' class='form-control input-md'/> </td><td><input  name='urls" + id + "' value='" + urls + "'type='text' placeholder='Urls'  class='form-control input-md'></td><td><input  name='color" + id + "' value='" + color + "' type='color' placeholder='color'  class='form-control input-md'></td>"

    var newRowTag = document.createElement('tr');
    newRowTag.setAttribute('id', 'group' + id);
    newRowTag.innerHTML = newRowHtml;

    lines.appendChild(newRowTag);
}

function deleteUrlRow() {    
    var table = document.getElementById("color-navbars");
    var rowCount = table.rows.length;
    if(rowCount > 2) {
        table.deleteRow(rowCount -1);
    }
}

// Update stored list of dags when validating form

document.getElementById("add-row").addEventListener("click", addEmptyUrlRow);

document.getElementById("delete-row").addEventListener("click", deleteUrlRow);

document.getElementById("validate").addEventListener("click", update);

document.getElementById("reset-highlight-default").addEventListener("click", resetHightlightDefault);

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
