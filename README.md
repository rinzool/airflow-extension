# Airflow Run Extension

Chrome Extension automatically generating "Airflow run" command from Airflow UI.


## Demo

![Démo](demo/demo.gif)


## Installation

Clone repository where you want it, for example in your home.

```console
git clone https://github.com/rinzool/airflow-run-extension.git ~/
```

Go to _Open chrome > More Tools > Extensions_

Active _Developer Mode_ on the top right, then select _Load Unpack_ on the top left, and choose this directory.

## Use

When you are on Airflow user interface, display the modal of a task or open task details and then click on the extension. It will automatically get *dag_id, task_id* and *execution_date* from the page DOM and copy it to your clipboard.


## Updates 

To get updated :
* `git pull`
* Open _chrome > More Tools > Extensions_ and click on the reload button (circle arrow) in the _Airflow Extension_ section.

## Author

[Quentin Nambot](quentin.nambot@grenoble-inp.org)
