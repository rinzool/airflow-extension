// Inject content script
chrome.tabs.executeScript({
  file: 'executedScript.js'
});

// Trigger content script
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
    processContentResponse(response);
  });
});

