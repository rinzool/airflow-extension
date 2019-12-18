const defaultHighlightStyle = 'background: lightgoldenrodyellow; font-weight: bold;';
var currentBrowser = typeof InstallTrigger !== 'undefined' ? browser : chrome;

if (document.getElementsByTagName("title")[0].innerText.match(/Airflow/ig)) {
  // Load dags to highlight them
  currentBrowser.storage.sync.get('dags', function(data) {
    if (data.dags) {
      currentBrowser.storage.sync.get('highlightStyle', function(style) {
        highlightDags(data.dags, style.highlightStyle ? style.highlightStyle : defaultHighlightStyle);
      })
    }
  })

  // Check if there is colorblind option
  currentBrowser.storage.sync.get('colorblind', function(data) {
    if (data.colorblind) {
      activateColorBlindMode();

      document.getElementById('refresh_button').addEventListener('click', activateColorBlindMode);
    }
  })
}

function highlightDags(dags, style) {
  if (!document.getElementById("dags")) return;

  for (let tr of document.getElementById("dags").children[1].children) {
    for (let dag of dags) {
      if (tr.children[2].innerText.includes(dag)) {
        tr.setAttribute("style", style);
        break;
      }
    }
  }
}

function activateColorBlindMode() {
  alert("TODO COLOR BLIND")
}
