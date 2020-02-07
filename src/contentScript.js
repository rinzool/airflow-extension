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
  currentBrowser.storage.sync.get('colors', function(data) {
    if (data.colors) {
      activateColorBlindMode(data.colors);
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

function activateColorBlindMode(colors) {
  const style = document.createElement("style");
  document.head.appendChild(style);
  
  let styleSheet = style.sheet;

  const dict = {};

  for (let i = 0; i < colors.length; i ++) {
    const color = colors[i];
    styleSheet.insertRule('rect.' + color.state + ' {fill: ' + color.color + '}', 0);
    styleSheet.insertRule('g.node.' + color.state + ' rect {stroke: ' + color.color + '}', 0);

    dict[color.state] = color.color;
  }


  const circles = document.getElementsByTagName("circle")
  for (let i = 0; i < circles.length; i ++) {
    const circle = circles[i];

    const title = circle.getAttribute("data-original-title");
    if (title && dict[title]) {
      circle.setAttribute("stroke", dict[title]);
    }
  }
}
