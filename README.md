# Airflow Run Extension

Browser Extension automatically generating "Airflow run" and other commands from Airflow UI.

Compatible with Chrome and Firefox.

## Demo

![Démo](demo/demo.gif)


## Installation

Clone repository where you want it, for example in your home.

```console
git clone https://github.com/rinzool/airflow-run-extension.git ~/
```

Build package
```console
cd airflow-run-extension
./build.sh
```

### Chrome
On Chrome, go to `chrome://extensions/`

Active _Developer Mode_ on the top right, then select _Load Unpack_ on the top left, and choose the subdirectory `airflow-run-extension/chrome`.

### Firefox

On Firefox, go to `about:debugging`

Click on _Load Temporary Add-on_ on the top right.

Select the file `airflow-run-extension/firefox/manifest.json`


## How to use it

On Airflow user interface, click on extension button and a command will be automatically generated if possible.

Then you can directly copy the command to clipboard since it is already selected.

> For **Chrome** users, the command is directly copied to clipboard

### Airflow run 

When you are on Airflow user interface in one of these two situations :
* The modal showing actions for a specific task is opened 
* The page is a _Task instance_ page (i.e. _Task Instance detail, Rendered Template, Log_ or _XCom_)

It will automatically generate `airflow run dag_id task_id execution_date`.

### Running Command

On the log page of a task, the extension will fetch the `Running command` called by the task if it exists.

## Updates

To get last updates :
* `git pull`
* `./build.sh`
* Reload extension on your browser

## Author

[Quentin Nambot](mailto:quentin.nambot@grenoble-inp.org)
