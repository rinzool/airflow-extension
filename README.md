# Airflow Run Extension

Chrome Extension automatically generating "Airflow run" command from Airflow UI.


## Demo

![Démo](demo/demo.gif)


## Installation

Clone repository where you want it, for example in your home.

```console
git clone https://github.com/rinzool/airflow-run-extension.git ~/
```

Build package
```console
./build.sh
```

### Chrome
On Chrome, go to `chrome://extensions/`

Active _Developer Mode_ on the top right, then select _Load Unpack_ on the top left, and choose this directory.

### Firefox

On Firefox, go to `about:debugging`

Click on _Load Temporary Add-on_ on the top right.

Select the file `airflow-run-extension/firefox/manifest.json`




## Use

When you are on Airflow user interface, display the modal of a task or open task details and then click on the extension. It will automatically get *dag_id, task_id* and *execution_date* from the page DOM and generate `airflow run dag_id task_id execution_date`.

Then you can directly copy the command to clipboard since it is selected.

> For **Chrome** users, the command is directly copied to clipboard


## Updates

To get last updates :
* `git pull`
* `./build.sh`
* Reload extension on your browser

## Author

[Quentin Nambot](quentin.nambot@grenoble-inp.org)
