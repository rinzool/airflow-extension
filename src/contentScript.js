/**
 * Parse url to get params 
 * Thanks to Jan Turon 
 * https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
 */
function getJsonFromUrl() {
  var url = location.href;
  var question = url.indexOf("?");
  var hash = url.indexOf("#");
  if(hash==-1 && question==-1) return {};
  if(hash==-1) hash = url.length;
  var query = question==-1 || hash==question+1 ? url.substring(hash) :
  url.substring(question+1,hash);
  var result = {};
  query.split("&").forEach(function(part) {
    if(!part) return;
    part = part.split("+").join(" "); // replace every + with space, regexp-free version
    var eq = part.indexOf("=");
    var key = eq>-1 ? part.substr(0,eq) : part;
    var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
    var from = key.indexOf("[");
    if(from==-1) result[decodeURIComponent(key)] = val;
    else {
      var to = key.indexOf("]",from);
      var index = decodeURIComponent(key.substring(from+1,to));
      key = decodeURIComponent(key.substring(0,from));
      if(!result[key]) result[key] = [];
      if(!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
}


/**
 * Get data from content page
 * May be: airflow run data or log data
 */
function getAirflowData() {
  // Get params
  let url = location.href
  let params = getJsonFromUrl();
  let data = {success: true}

  if(url.match(/airflow\/log/)) {
    getLogData(data, params);
  }
  else {
    getRunData(data, params);
  }

  return data;
}

/**
 * Get dag_id, task_id and execution_id and return them
 * If they are not found, return {success: false}
 */
function getRunData(data, params) {
  data.run = true;
  // Get data from url
  if(params.dag_id && params.task_id && params.execution_date) {
    data.dag_id = params.dag_id;
    data.task_id = params.task_id;
    data.execution_date = params.execution_date;
  }
  // Or get them from modal info
  else if(params.dag_id && document.getElementsByTagName("body")[0].getAttribute("class") && document.getElementsByTagName("body")[0].getAttribute("class").match(/modal-open/ig)) {
    data.dag_id = params.dag_id;
    data.task_id = document.getElementById("task_id").innerText;
    data.execution_date = document.getElementById("execution_date").innerText;
  }
  else {
    data.success = false;
    data.error = "Unable to generate airflow run command";
  }
}

function getLogData(data, params) {
  data.log = true;
  let logs = document.getElementsByTagName("pre")[0].innerText;
  let matchResult = logs.match(/Running\ command:\ (.*)/);

  if(matchResult) {
    data.command = matchResult[1];
  }
  else {
    // If there is no running command we fetch `airflow run ...`
    getRunData(data, params);
  }
}


var isFirefox = typeof InstallTrigger !== 'undefined';
var currentBrowser = isFirefox ? browser : chrome;

currentBrowser.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  sendResponse(getAirflowData());
});
