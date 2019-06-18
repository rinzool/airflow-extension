# Copy all src files in browser directories
cp src/* chrome/
cp src/* firefox/
cp -r images/ chrome/
cp -r images/ firefox/

sed -i s/BROWSER_LISTENER/chrome.runtime.onMessage.addListener/g chrome/contentScript.js  
sed -i s/BROWSER_LISTENER/browser.runtime.onMessage.addListener/g firefox/contentScript.js  
