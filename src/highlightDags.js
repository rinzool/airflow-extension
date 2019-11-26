const defaultHighlightStyle = 'background: lightgoldenrodyellow; font-weight: bold;';
const currentBrowser = typeof InstallTrigger !== 'undefined' ? browser : chrome;

currentBrowser.storage.sync.get('dags', function(data) {
  if(data.dags && document.getElementsByTagName("title")[0].innerText.match(/Airflow/ig)) {
    currentBrowser.storage.sync.get('highlightStyle', function(style) {
      highlightDags(data.dags, style.highlightStyle ? style.highlightStyle : defaultHighlightStyle);
    })
  }
})

function highlightDags(dags, style) {
  if(!document.getElementById("dags")) return;

  for(let tr of document.getElementById("dags").children[1].children) {
    for(let dag of dags) {
      if(tr.children[2].innerText.includes(dag)) {
        tr.setAttribute("style", style);
        break;
      }
    }
  }
}
