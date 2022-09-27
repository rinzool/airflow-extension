# Airflow Extension

Browser Extension to improve Airflow User Experience, on the web server.

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
cd airflow-extension
./build.sh
```

### Chrome
On Chrome, go to `chrome://extensions/`

Active _Developer Mode_ on the top right, then select _Load Unpack_ on the top left, and choose the subdirectory `airflow-run-extension/chrome`.

### Firefox

> WARNING : You will need Firefox Developer Edition to install the add-on and set the field `xpinstall.signatures.required` to `false` in the configuration window ([about:config](about:config)).

First, all source files must be zipped. Go to `./firefox/` and run 

```
zip -r airflox-extension.zip *
```

Then on Firefox, go to *add-ons* menu ([about:addons](about:addons)), choose _Install Add-on from file_ and select `firefox/airflow-extension.zip`

## Features


### Airflow run 

When you are on Airflow user interface in one of these two situations :
* The modal showing actions for a specific task is opened 
* The page is a _Task instance_ page (i.e. _Task Instance detail, Rendered Template, Log_ or _XCom_)


On Airflow user interface, click on extension button and a command will be automatically generated if possible.
It will automatically generate `airflow run dag_id task_id execution_date`.
Then the command is directly copied to clipboard

### Running Command

On the log page of a task, the extension will fetch the `Running command` called by the task if it exists.

### Highlight DAGs

It is possible to define a list of DAGs which will be highlighted on Airflow UI.

Open extension popup and then click on "_Settings_".

In _settings_ page, define a list of DAGs name in _csv_ (_e.g. dag1,dag2,dag3_) inthe textarea under "_List of dags to highlight_". 
Then on Airflow UI _"DAGs"_ page, if a DAG name contains one of the name defined in option, the line will be highlighted.

> It is possible to customize style applied to highlighted DAG's in _Option page_. You just need to change the CSS style.

### Color Navbar depending on environment

It is possible to distinguish Airflow environment depending on URL to use a custom color for prod and/or staging.

In settings section, it is possible to add a list of url (_csv format_) for prod and staging, and to define a dedicated 
color.

### Color Blind friendly

It is possible to choose colors for each task state to use most appropriate set of colors depending on possible color blindness.

## Updates

To get last updates :
* `git pull`
* `./build.sh`
* (**for firefox users only**) `cd firefox; zip -r firefox.zip *`
* Reload extension on your browser or re-import it for firefox users

## Contribute
Fork the project and submit a PR on the Github repo.

## Author

[Quentin Nambot](mailto:quentin.nambot@grenoble-inp.org)
