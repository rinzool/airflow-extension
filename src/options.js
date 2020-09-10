// Get DOM elements
const successAlert = document.getElementById("success-alert");
const dagsTextArea= document.getElementById("dags");
const hightlightStyleInput = document.getElementById('highlight-dag-style');
const prodUrls = document.getElementById('prod-urls');
const prodUrlColor = document.getElementById('prod-color');
const stagingUrls = document.getElementById('staging-urls');
const stagingUrlColor = document.getElementById('staging-color');
const colorblindOption = document.getElementById('colorblind-option');

const defaultHighlightStyle = 'background: lightgoldenrodyellow; font-weight: bold;';

const defaultProdColor = '#ed4c1a';
const defaultStagingColor = '#67e1d0';

const defaultTasksColors = [
  {state: "success", color: "#448102"},
  {state: "running", color: "#7ae11d"},
  {state: "failed", color: "#ed4c1a"},
  {state: "upstream_failed", color: "#f7a400"},
  {state: "queued", color: "#808080"},
  {state: "up_for_reschedule", color: "#67e1d0"},
  {state: "skipped", color: "#f5bfcb"},
  {state: "no_status", color: "#ffffff"}
];

var currentBrowser = typeof InstallTrigger !== 'undefined' ? browser : chrome;

// Fetch stored dags
currentBrowser.storage.sync.get('dags', function(data) {
  dagsTextArea.value = data.dags ? data.dags : '';
})

currentBrowser.storage.sync.get('highlightStyle', function(data) {
  hightlightStyleInput.value = data.highlightStyle ? data.highlightStyle : defaultHighlightStyle;
})

currentBrowser.storage.sync.get('prodUrl', function(data) {
  console.log(data);
  prodUrls.value = data.prodUrl ? data.prodUrl.urls : '';
  prodUrlColor.value = data.prodUrl ? data.prodUrl.color : defaultProdColor;
})

currentBrowser.storage.sync.get('stagingUrl', function(data) {
  console.log(data);
  stagingUrls.value = data.stagingUrl ? data.stagingUrl.urls : '';
  stagingUrlColor.value = data.stagingUrl ? data.stagingUrl.color : defaultStagingColor;
})

currentBrowser.storage.sync.get('colors', function(data) {
  displayColorsForm(data.colors ? data.colors : defaultTasksColors); 
})

// Display form 
function displayColorsForm(colors) {
  const parentDiv = document.getElementById("colors");
  
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];

    const row = document.createElement("tr");

    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");

    const input = document.createElement("input");
    input.setAttribute("type", "color")
    input.setAttribute("name", "color-" + color.state);
    input.setAttribute("id", "color-" + color.state);
    input.setAttribute("value", color.color);

    cell1.appendChild(document.createTextNode("Task " + color.state));
    cell2.appendChild(input)

    row.appendChild(cell1);
    row.appendChild(cell2);


    parentDiv.appendChild(row);
  }
}


// Update options 
function update() {
  hide(successAlert);
  
  const dags = dagsTextArea.value.split(',').map(dag => dag.replace(' ', ''));
  const style = hightlightStyleInput.value;
  const prodUrlsValues = prodUrls.value.split(',').map(url => url.replace(' ', ''));
  const stagingUrlsValues = stagingUrls.value.split(',').map(url => url.replace(' ', ''));
  const colors = getColors();

  var data = {}
  if(dags) data.dags = dags;
  if(style) data.highlightStyle = style;
  if(prodUrlsValues) data.prodUrl = {urls: prodUrlsValues, color: prodUrlColor.value};
  if(stagingUrlsValues) data.stagingUrl = {urls: stagingUrlsValues, color: stagingUrlColor.value};
  data.colors = colors;

  currentBrowser.storage.sync.set(data, function() {
    show(successAlert);
    setTimeout(function() {hide(successAlert);}, 2000);
  });
}

function getColors() {
  let colors = [];

  for (let i = 0; i < defaultTasksColors.length; i++) {
    const state = defaultTasksColors[i].state;
    const color = document.getElementById("color-" + state).value;
    colors.push({state: state, color: color});
  }

  return colors;
}

// Reset hightlight default style
function resetHightlightDefault() {
  hightlightStyleInput.value = defaultHighlightStyle;
}

function resetColorsDefault() {
  let colors = [];

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

// Update stored list of dags when validating form
document.getElementById('validate').addEventListener('click', update)

document.getElementById('reset-highlight-default').addEventListener('click', resetHightlightDefault)

document.getElementById('reset-colors-default').addEventListener('click', resetColorsDefault)

document.getElementById('reset-prod-color-default').addEventListener('click', resetProdColorDefault)

document.getElementById('reset-staging-color-default').addEventListener('click', resetStagingColorDefault)

// Basic show/hide functions
function hide(e) {
  e.setAttribute("style", "display: none");
}

function show(e) {
  e.setAttribute("style", "display: block");
}

// Update when enter
document.addEventListener('keypress', function(e) {
  if(e.keyCode == 13) {
    update();
  }
});
