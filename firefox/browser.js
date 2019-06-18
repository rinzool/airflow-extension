browser.tabs.executeScript(null, { file: "contentScript.js" });

browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
  browser.tabs.sendMessage(tabs[0].id, {}).then(response => {
    processContentResponse(response);
  }, err => {
    console.error("ERROR", err)
  });
})


