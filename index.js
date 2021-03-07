let juegosSugeridos = document.getElementById("suggestions");
let url = "https://api.rawg.io/api/games";
let urlPlataformas = "https://api.rawg.io/api/platforms";
let urlGenres = "https://api.rawg.io/api/genres";
let urlStores = "https://api.rawg.io/api/stores";
let listaJuegos;

let urlBuscar = "https://api.rawg.io/api/games?search=";
let listaBuscar = document.getElementById("juego");

function escribir(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        search();
    }
}

window.onload = function () {
    document.getElementById("main").style.color = `white`;
}

let urlsuggestions = "https://api.rawg.io/api/games?page_size=60"
let juegos = ""

fetch(urlsuggestions)
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        listaJuegos = datos.results;
        let arrayNumAleatorio = [];
        let min = 0;
        let max = datos.results.length - 1
        for (i = 0; i < 4; i++) {
            temp = Math.round(Math.random() * max);
            temporal = parseInt((Math.floor(temp)) + 1);
            if ((temporal >= min) && (temporal <= max)) {
                if (arrayNumAleatorio.indexOf(temporal) != -1) {
                    i--;
                    continue;
                } else {
                    arrayNumAleatorio.push(temporal);
                }
            } else {
                i--;
                continue;
            }
        }
        for (let i = 0; i < arrayNumAleatorio.length; i++) {
            let x = arrayNumAleatorio[i];
            juegos = `
            <div class="container">`
            if (datos.results[x].background_image != null) {
                juegos += `<img src="${datos.results[x].background_image}" alt="${datos.results[x].name_original}" />`
            } else {
                juegos += `<p>There is no image related to this videogame. </p>`;
            }
            juegos += `
            <p class="title">${datos.results[x].name}</p>
            <div class="button"><button onclick="obtenerInfoJuegoSugerencias(${datos.results[x].id})">INFO</button></div>
            </div>
            `
            juegosSugeridos.innerHTML += juegos;
        }
    })
    .catch(function (err) {
        alert(err);
    });

let selects = document.getElementById("platform");



fetch(urlPlataformas)
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        listaPlataforma = datos.results;
        //Ordenamos los sets por orden alfabético
        function compare(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }
        listaPlataforma.sort(compare);
        for (let i = 0; i < datos.results.length; i++) {
            let opcionPlataforma = `<option class="selects" value=${datos.results[i].id}>${datos.results[i].name}</option>`
            selects.innerHTML += opcionPlataforma;
        }
        console.log(datos)
    });

let selects1 = document.getElementById("genres");

fetch(urlGenres)
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        listaPlataforma = datos.results;
        //Ordenamos los sets por orden alfabético
        function compare(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }
        listaPlataforma.sort(compare);
        for (let i = 0; i < datos.results.length; i++) {
            let opcionPlataforma = `<option value=${datos.results[i].id}>${datos.results[i].name}</option>`
            selects1.innerHTML += opcionPlataforma;
        }
        console.log(datos)
    });

let selects2 = document.getElementById("stores");

fetch(urlStores)
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        listaPlataforma = datos.results;
        //Ordenamos los sets por orden alfabético
        function compare(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }
        listaPlataforma.sort(compare);
        for (let i = 0; i < datos.results.length; i++) {
            let opcionPlataforma = `<option value=${datos.results[i].id}>${datos.results[i].name}</option>`
            selects2.innerHTML += opcionPlataforma;
        }
        console.log(datos)
    });

function plataforma() {
    document.getElementById("infoJuego").innerHTML = "";
    mostrarElemento("juego");
    let urlPlataformas = "https://api.rawg.io/api/games?platforms="
    let idplataforma = document.getElementById("platform").value;

    fetch(urlPlataformas + idplataforma)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            console.log(datos)
            listaJuegos = datos.results;
            for (i = 0; i < datos.results.length; i++) {
                let listaBuscarJuegos = `<div class=listSearch><div id=infoLista>
                    <img width = 100px height = 80px; src="${datos.results[i].background_image}" alt="${datos.results[i].name}" />
                    <p>${datos.results[i].name}</p>
                    <button id=infoLista onclick="obtenerInfoJuego(${datos.results[i].id})">INFO</button>
                    <button id=infoLista onclick="quitarFavorito(${datos.results[i].id})">Favorite</button>
                    </div>
                    </div>
                    `
                listaBuscar.innerHTML += listaBuscarJuegos;
            }
        })

        .catch(function (err) {
            alert(err);
        });
    document.getElementById("juego").innerHTML = "";

}

function genero() {
    document.getElementById("infoJuego").innerHTML = "";
    mostrarElemento("juego");
    let urlGenres = "https://api.rawg.io/api/games?genres="
    let idGenero = document.getElementById("genres").value;

    fetch(urlGenres + idGenero)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            console.log(datos)
            listaJuegos = datos.results;
            for (i = 0; i < datos.results.length; i++) {
                let listaBuscarJuegos = `<div class=listSearch><div id=infoLista>
                    <img width = 100px height = 80px; src="${datos.results[i].background_image}" alt="${datos.results[i].name}" />
                    <p>${datos.results[i].name}</p>
                    <button id=infoLista onclick="obtenerInfoJuego(${datos.results[i].id})">INFO</button>
                    <button id=infoLista onclick="quitarFavorito(${datos.results[i].id})">Favorite</button>
                    </div>
                    </div>
                    `
                listaBuscar.innerHTML += listaBuscarJuegos;
            }
        })

        .catch(function (err) {
            alert(err);
        });
    document.getElementById("juego").innerHTML = "";

}

function tienda() {
    document.getElementById("infoJuego").innerHTML = "";
    mostrarElemento("juego");
    let urlStores = "https://api.rawg.io/api/stores/"
    let idGenero = document.getElementById("stores").value;

    fetch(urlStores + idGenero)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            console.log(datos)
            listaJuegos = datos;

            let listaBuscarJuegos = `<div id="infoJuego">
                    <img width = 100px height = 80px; src="${datos.image_background}" alt="${datos.name}" />
                    <p>${datos.name}</p>
                    <p><a href="https://${datos.domain}">LINK</a></p>
                    <p>${datos.description}</p>
                    </div>
                    </div>
                    `
            listaBuscar.innerHTML += listaBuscarJuegos;

        })

        .catch(function (err) {
            alert(err);
        });
    document.getElementById("juego").innerHTML = "";

}

function obtenerInfoJuegoSugerencias(idJuego) {
    document.getElementById("juego").innerHTML = "";
    let x = document.getElementById("infoJuego");
    x.style.display = "flex";
    let y = document.getElementById("juego")
    y.style.display = "none";
    fetch(url + "/" + idJuego)
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
            <div id="botonJuego">
            <button onclick="mostrarElemento('juego');ocultarElemento('infoJuego');">RETURN</button>
            <button id=infoBoton onclick="guardarFavorito('${idJuego}')">Favorite</button>
            </div>
            </div>
            `;
            comprobarFavorito(idJuego)
        })
        .catch(function (err) {
            alert(err);
        });
}

function search() {
    document.getElementById("juego").innerHTML = "";
    document.getElementById("infoJuego").innerHTML = "";
    let x = document.getElementById("juego");
    x.style.display = "flex";
    let juegoBuscar = document.getElementById("buscar").value;
    fetch(urlBuscar + juegoBuscar)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            console.log(datos);
            for (let i = 0; i < datos.results.length; i++) {
                let listaBuscarJuegos = `<div class=listSearch><div id=infoLista>
                <img width = 100px height = 80px; src="${datos.results[i].background_image}" alt="${datos.results[i].name}" />
                <p>${datos.results[i].name}</p>
                <button id=infoLista onclick="obtenerInfoJuego(${datos.results[i].id})">INFO</button>
                <button id=infoLista onclick="guardarFavorito(${datos.results[i].id})">Favorite</button>
                </div>
                </div>
                `
                listaBuscar.innerHTML += listaBuscarJuegos;
                document.getElementById('juego').scrollIntoView({ behavior: "smooth" });
            }
        })
        .catch(function (err) {
            alert(err);
        });
}

function ocultarElemento(elemento) {
    let elem = document.getElementById(elemento);
    elem.style.display = "none";
}

function mostrarElemento(elemento) {
    let elem = document.getElementById(elemento);
    elem.style.display = "flex";
}

function obtenerInfoJuego(idJuego) {
    ocultarElemento("juego");
    mostrarElemento("infoJuego");
    let x = document.getElementById("infoJuego");
    x.style.display = "flex";
    fetch(url + "/" + idJuego)
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
            <div id="botonJuego">
                        <button onclick="ocultarElemento('infoJuego');mostrarElemento('juego');">RETURN</button>
                        <button id=infoBoton onclick="guardarFavorito('${idJuego}')">Favorite</button>
                    </div>
            </div>
            `;
            comprobarFavorito(idJuego)
        })
        .catch(function (err) {
            alert(err);
        });
}

function guardarFavorito(idJuegoFavorito) {
    let favoritos = JSON.parse(localStorage.getItem("idJuegos")) || [];

    if (favoritos.includes(idJuegoFavorito)) {
        alert("Este juego ya esta en favoritos");
    } else {
        favoritos.push(idJuegoFavorito);
        localStorage.setItem("idJuegos", JSON.stringify(favoritos));
        comprobarFavorito(idJuegoFavorito);
    }
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