# Airflow Extension

Browser Extension to improve Airflow UI User Experience.

Compatible with Chrome and Firefox.
This extension has been tested on the following Airflow versions:
- 2.2.2

This extension is not available on Chrome and Firefox stores. You'll need to build it yourself.

## Features
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

## Installation

Clone repository where you want it, for example in your home.

```console
git clone https://github.com/rinzool/airflow-run-extension.git ~/
```

Build package
```console
cd airflow-extension
make build-all
```

### Chrome
On Chrome, go to `chrome://extensions/`

Active _Developer Mode_ on the top right, then select _Load Unpack_ on the top left, and choose the subdirectory `airflow-run-extension/chrome`.

### Firefox

> WARNING : You will need Firefox Developer Edition to install the add-on and set the field `xpinstall.signatures.required` to `false` in the configuration window ([about:config](about:config)).

Firefox, go to *add-ons* menu ([about:addons](about:addons)), choose _Install Add-on from file_ and select `firefox/airflow-extension.zip`

## Updates

To get last updates :
* `git pull`
* `make build-all`
* Reload extension on your browser or re-import it for firefox users

## Contribute
Fork the project and submit a PR on the Github repo.

You may use the Makefile to build and clean the files and folders.

Technologies :
- [Prettier](https://prettier.io/): Code formater
- [Bootstrap](https://getbootstrap.com/): Frontend toolkit
- [HTML5 Validator Action](https://github.com/Cyb3r-Jak3/html5validator-action): HTML Validator

## Author

[Quentin FLEURENT NAMBOT](https://github.com/rinzool)
[Lukland](https://github.com/lukland)
