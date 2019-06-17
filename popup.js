/**
 * Thanks to Angelos Chalaris 
 * https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
 */
const copyToClipboard = str => {
  const el = document.createElement('textarea');  // Create a <textarea> element
  el.value = str;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
};

// Inject content script
chrome.tabs.executeScript({
  file: 'contentScript.js'
});


// Display/hide html tag
function show(tag) {
  tag.setAttribute("style", "display: block;");
}

function hide(tag) {
  tag.setAttribute("style", "display: none;");
}

// Get main elements
let input = document.getElementById('field');
let inputDiv = document.getElementById('input-div');
let error = document.getElementById("error");
let seeMore = document.getElementById("see-more");
let seeMoreButton = document.getElementById("see-more-button");
let seeMoreContent = document.getElementById("see-more-content");

// Trigger content script
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {

    if(response && response.success) {
      show(inputDiv);
      hide(seeMore);
      hide(error);

      // Update value
      input.value = `airflow run ${response.dag_id} ${response.task_id} ${response.execution_date}`;
      
      // Focus, select and copy to clipboard the value
      copyToClipboard(input.value);
      input.focus();
      input.select();

    }
    else {
      hide(seeMoreContent);
      show(error);
      show(seeMore);
      hide(inputDiv);

      error.innerText = "Unable to generate airflow run command"
    }
  });
});

seeMoreButton.addEventListener('click', function(){show(seeMoreContent)})


