palabras = ["Camion", "Perro", "Ahorcado", "Portatil", "DonPollo"];

function escogerPalabra(palabras) {
    let indice = Math.floor(Math.random() * palabras.length + 1)
    return palabras[indice]
}

let palabra = escogerPalabra(palabras);
console.log(palabra);

function pintarGuiones(palabra) {
    let guiones = palabra.length();
    let res = "";
    for (let i = 0; i < guiones; i++) {
        res += "_ "
    }
    return res;
}

let guiones = pintarGuiones(palabra);
console.log(guiones);

while (true) {

}

