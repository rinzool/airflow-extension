// Get DOM elements
const successAlert = document.getElementById("success-alert");
const dagsTextArea= document.getElementById("dags");
const hightlightStyleInput = document.getElementById('highlight-dag-style');
const colorblindOption = document.getElementById('colorblind-option');

const defaultHighlightStyle = 'background: lightgoldenrodyellow; font-weight: bold;';

var currentBrowser = typeof InstallTrigger !== 'undefined' ? browser : chrome;

// Fetch stored dags
currentBrowser.storage.sync.get('dags', function(data) {
  dagsTextArea.value = data.dags ? data.dags : '';
})

currentBrowser.storage.sync.get('highlightStyle', function(data) {
  hightlightStyleInput.value = data.highlightStyle ? data.highlightStyle : defaultHighlightStyle;
})

currentBrowser.storage.sync.get('colorblind', function(data) {
  colorblindOption.checked = data.colorblind;
})

// Update stored list of dags
function update() {
  hide(successAlert);
  
  const dags = dagsTextArea.value.split(',').map(dag => dag.replace(' ', ''));
  const style = hightlightStyleInput.value;
  const colorblind = colorblindOption.checked;

  var data = {}
  if(dags) data.dags = dags;
  if(style) data.highlightStyle = style;
  data.colorblind = colorblind;
  

  console.log(data)

  currentBrowser.storage.sync.set(data, function() {
    show(successAlert);
    setTimeout(function() {hide(successAlert);}, 2000);
  });
}

// Reset hightlight default style
function resetHightlightDefault() {
  hightlightStyleInput.value = defaultHighlightStyle;
}

// Update stored list of dags when validating form
document.getElementById('validate').addEventListener('click', update)

document.getElementById('reset-highlight-default').addEventListener('click', resetHightlightDefault)

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
