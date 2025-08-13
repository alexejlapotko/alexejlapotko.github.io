var but_cont = document.getElementById("but_cont");
var but_cont_back = document.getElementById("but_cont_back");

function createRotateButton(rotName, forward) {
        var button = document.createElement("div");
        button.id = rotName;
        if (forward) button.id += "-back";
        button.id += "_rotate";
        button.className = "rotate_button";
        button.addEventListener("click", function () { rotate(rotName + (forward ? "'" : "")); }, false);

        var title = rotName.toUpperCase();
        if (forward) title += "'";
        button.innerHTML = title;

        if (forward)
                but_cont_back.appendChild(button);
        else but_cont.appendChild(button);
}

var buttonNames = ["f", "l", "u", "x", "y", "z"];

for (var index = 0; index < buttonNames.length; index++) {
        createRotateButton(buttonNames[index]);
        createRotateButton(buttonNames[index], true);
}

