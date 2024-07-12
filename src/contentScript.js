const defaultHighlightStyle = "background: lightgoldenrodyellow; font-weight: bold;";
var currentBrowser = typeof InstallTrigger !== "undefined" ? browser : chrome;

const title = document.getElementsByTagName("title");

if (isAirflowInstance()) {
    // Load dags to highlight them
    currentBrowser.storage.sync.get("dags", function (data) {
        if (data.dags) {
            currentBrowser.storage.sync.get("highlightStyle", function (style) {
                highlightDags(data.dags, style.highlightStyle ? style.highlightStyle : defaultHighlightStyle);
            });
        }
    });

    currentBrowser.storage.sync.get("colorGroups", function (data) {
        colorNavBar(data.colorGroups);
    });
}

function isAirflowInstance() {
    const footer = document.querySelector("footer");

    if (footer) {
        const footerLinks = footer.querySelectorAll("a");
        for (link of footerLinks) {
            const href = link.getAttribute("href");
            if (href && href.includes("https://pypi.python.org/pypi/apache-airflow")) {
                return true;
            }
        }
    }
    return false;
}

function highlightDags(dags, style) {
    let dagsElement = document.getElementsByClassName("dags-table-body")[0];
    if (!dagsElement || (dags.length === 1 && dags[0] === "")) return;
    for (let tr of dagsElement.children[0].children[1].children) {
        for (let dag of dags) {
            if (tr.children[1].innerText.includes(dag)) {
                tr.setAttribute("style", style);
                break;
            }
        }
    }
}

function colorNavBar(colorGroups) {
    colorGroups.forEach(function (colorGroup) {
        // Match URLs with "*" wildcards - e.g. *.prod.*.mycompany.com
        isUrlMatched = colorGroup.urls
            .map((url) => url.replace(/\./g, ".").replace("*", ".*"))
            .find((urlRegex) => location.host.match(urlRegex));

        if (isUrlMatched) {
            document
                .getElementsByClassName("navbar")[0]
                .setAttribute("style", "background-color: " + colorGroup.color + "!important");
            document
                .getElementsByClassName("active")[0]
                .children[0].setAttribute("style", "background-color: #00000020");
        }
    });
}

function activateColorBlindMode(colors) {
    const style = document.createElement("style");
    document.head.appendChild(style);

    let styleSheet = style.sheet;

    const dict = {};

    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        styleSheet.insertRule("rect." + color.state + " {fill: " + color.color + "}", 0);
        styleSheet.insertRule("g.node." + color.state + " rect {stroke: " + color.color + "}", 0);
        styleSheet.insertRule(
            'span[data-state="' + color.state + '"] {border-color: ' + color.color + " !important}",
            0,
        );
        dict[color.state] = color.color;
    }

    colorCircles(dict, 0);
}

function colorCircles(dict, n) {
    const circles = document.getElementsByTagName("circle");

    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        const title = circle.getAttribute("data-original-title");
        if (title && dict[title]) {
            circle.setAttribute("stroke", dict[title]);
        }
    }

    if (n < 20) {
        setTimeout(function () {
            colorCircles(dict, n + 1);
        }, 500);
    }
}

function getAirflowVersion() {
    var versionLine = document.getElementsByTagName("footer")[0].outerText.split("\n")[0];
    var versionRegex = "[1-9].[1-9].[1-9]";
    var version = versionLine.match(versionRegex)[0];
    return version;
}
