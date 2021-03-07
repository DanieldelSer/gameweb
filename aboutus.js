
window.onload = function () {
    document.getElementById("aboutus").style.color = `white`;
}

let x = document.getElementById("languages");
let y = document.getElementById("creator");
let z = document.getElementById("interest");

x.style.display = "none";
y.style.display = "none";
z.style.display = "none";

function ocultarMostrarAbout(idButton) {
    let x = document.getElementById("languages");
    let y = document.getElementById("creator");
    let z = document.getElementById("interest");

    switch (idButton) {
        case 1:

            x.style.display = 'block';
            y.style.display = 'none';
            z.style.display = 'none';
            break;

        case 2:
            x.style.display = 'none';
            y.style.display = 'block';
            z.style.display = 'none';
            break;

        case 3:
            x.style.display = 'none';
            y.style.display = 'none';
            z.style.display = 'block';
            break;

        default:
            break;
    }

}
