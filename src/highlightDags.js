chrome.storage.sync.get('dags', function(data) {
  if(data.dags && document.getElementsByTagName("title")[0].innerText.match(/Airflow/ig)) {
    highlightDags(data.dags);
  }
})

function highlightDags(dags) {
  if(!document.getElementById("dags")) return;

  for(let tr of document.getElementById("dags").children[1].children) {
    for(let dag of dags) {
      if(tr.children[2].innerText.includes(dag)) {
        tr.setAttribute("style", "background: lightgoldenrodyellow; font-weight: bold;");
        break;
      }
    }
  }
}
