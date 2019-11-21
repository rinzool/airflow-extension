// Get DOM elements
const successAlert = document.getElementById("success-alert");
const dagsTextArea= document.getElementById("dags");

// Fetch stored dags
chrome.storage.sync.get('dags', function(data) {
  dagsTextArea.value = data.dags ? data.dags : '';
})

// Update stored list of dags
function updateDags() {
  hide(successAlert);
  
  const dags = dagsTextArea.value.split(',').map(dag => dag.replace(' ', ''));

  chrome.storage.sync.set({dags: dags}, function() {
    show(successAlert);
    setTimeout(function() {hide(successAlert);}, 2000);
  });
}

// Update stored list of dags when validating form
document.getElementById('validate').addEventListener('click', updateDags)

// Basic show/hide functions
function hide(e) {
  e.setAttribute("style", "display: none");
}

function show(e) {
  e.setAttribute("style", "display: block");
}

