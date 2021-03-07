
window.onload = function () {
    document.getElementById("favourite").style.color = `white`;
}

search()
function search() {
    let idJuegos = JSON.parse(localStorage.getItem("idJuegos"));
    document.getElementById("infoJuego").innerHTML = "";
    document.getElementById("juego").innerHTML = "";

    url = "https://api.rawg.io/api/games/";

    for (let i = 0; i < idJuegos.length; i++) {
        fetch(url + idJuegos[i])
            .then(function (respuesta) {
                return respuesta.json();
            })
            .then(function (datos) {
                document.getElementById("juego").innerHTML += `<div class=listSearch><div id=infoLista>
                <img width = 100px height = 80px; src="${datos.background_image}" alt="${datos.name}" />
                <p>${datos.name}</p>
                <button id=infoLista onclick="obtenerInfoJuego(${datos.id})">INFO</button>
                <button id=infoBoton onclick="quitarFavorito(${datos.id})">Favorite</button>
                </div>
                </div>
                `;
                comprobarFavorito(datos.id)
            });
    }
}

function obtenerInfoJuego(idJuego) {

    url = "https://api.rawg.io/api/games/";

    fetch(url + idJuego)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            console.log(datos);
            document.getElementById("infoJuego").innerHTML = `
        <div id="infoJuego">
        <h1>${datos.name}</h1>
        <p>${datos.released}</p>
        <p>${datos.developers[0].name}</p>`
            if (datos.genres.length > 0) {
                document.getElementById("infoJuego").innerHTML += `<p>${datos.genres[0].name}</p>`
            } else {
                document.getElementById("infoJuego").innerHTML += `<p>There is no genre related to this videogame. </p>`;
            }
            if (datos.clip != null) {
                document.getElementById("infoJuego").innerHTML += `<video src="${datos.clip.clip}" controls>;`
            } else {
                document.getElementById("infoJuego").innerHTML += `<p>There is no video related to this videogame. </p>`;
            }
            document.getElementById("infoJuego").innerHTML += `
        <p>${datos.description}</p>
        <div id=infoBoton>
        <button onclick="quitarFavorito('${datos.id}')">REMOVE FAVORITE</button>
        </div>
        </div>
        `;
            comprobarFavorito(datos.id)
        })
        .catch(function (err) {
            alert(err);
        });
}

// cargarFavoritos();

function cargarFavoritos() {
    let idJuegos = JSON.parse(localStorage.getItem("idJuegos"));

    url = "https://api.rawg.io/api/games/";

    for (let i = 0; i < idJuegos.length; i++) {
        fetch(url + idJuegos[i])
            .then(function (respuesta) {
                return respuesta.json();
            })
            .then(function (datos) {
                document.getElementById("infoJuego").innerHTML += `
            <div><img src="${datos.background_image}" alt="${datos.name}" /></div>
            <div id="infoJuego">
            <h1>${datos.name}</h1>
            <p>${datos.released}</p>
            <p>${datos.developers[0].name}</p>
            <p>${datos.genres[0].name}</p>
            <video src="${datos.clip.clip}" controls>
            Tu navegador no implementa el elemento <code>video</code>.
            </video>
            <p>${datos.description}</p>
            <button onclick="quitarFavorito('${datos.id}')">Quitar favorito conrazoncito</button>
            </div>
            `;
            });
    }
}

function quitarFavorito(idFavorito) {
    let idJuegos = JSON.parse(localStorage.getItem("idJuegos")) || [];
    for (let i = 0; i < idJuegos.length; i++) {
        if (idJuegos[i] == idFavorito) {
            idJuegos.splice(i, 1);
            document.getElementById("juego").innerHTML = "";
            break;
        }
    }
    localStorage.setItem("idJuegos", JSON.stringify(idJuegos));
    search()
}

function comprobarFavorito(idFavorito) {
    let idJuegos = JSON.parse(localStorage.getItem("idJuegos")) || [];
    for (let i = 0; i < idJuegos.length; i++) {
        if (idJuegos[i] == idFavorito) {
            let e = document.getElementById("infoBoton");
            e.id = "siFavorito";
        }
    }
}
