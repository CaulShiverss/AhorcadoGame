// [+] Variables Globales
const palabras = ["Camion", "Perro", "Ahorcado", "Portatil", "DonPollo"];
const abecedario = Array.from("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ");
let letrasAcertadas = []; 
let intentos;
let palabra;
let palabraArr;

// [+] Elementos del DOM a usar
const intentosSpan = document.getElementById("intentos")
const aciertosH3 = document.getElementById("acierto")
const msgFinal = document.getElementById("msg-final")
let divBotones = document.getElementById("botonesLetras");
let divGuiones = document.getElementById("guiones");

// [+] ----- Funcion escogerPalabra ----- [+]
function escogerPalabra(palabras) {
    let indice = Math.floor(Math.random() * palabras.length);
    return palabras[indice];
}

// [+] ----- Funcion crearBotones ----- [+]
function crearBotones(abecedario) {
    // Limpiamos el contenedor antes de agregar los botones
    divBotones.textContent = "";
    for (let i = 0; i < abecedario.length; i++) {
        let boton = document.createElement("button");
        boton.textContent = abecedario[i];
        
        // Añadimos el evento 1. Al clicar desaparecen
        boton.addEventListener("click", function() {
            this.style.visibility = "hidden";
            ultimaLetraPulsada = this.textContent;
        });
        
        // Añadimos el evento 2. Al clicar se comprueba el intento
        boton.addEventListener("click", comprobarIntentos);
        
        // Lo añadimos al DOM
        divBotones.appendChild(boton);
    }
}

// [+] ----- Funcion actualizarImagen ----- [+]
function actualizarImagen() {
    // Removemos la clase fade-in de todas las imágenes
    document.querySelectorAll('picture img').forEach(img => {
        img.classList.remove('fade-in');
    });
    // Mostramos la imagen correspondiente a los intentos restantes
    const imagen = document.getElementById('image' + intentos);
    if (imagen) {
        imagen.classList.add('fade-in');
    }
}

// [+] ----- Funcion pintarGuiones ----- [+]
function pintarGuiones(palabra, aciertos) {
    // Convertimos la palabra a array para recorrerla
    const palabraArray = Array.from(palabra);
    // Limpiamos el contenedor de guiones
    divGuiones.textContent = "";
    let parrafo = document.createElement("p");

    let res = "";
    // Por cada letra de la palabra, mostramos la letra si está en aciertos o un guion si no lo está
    for (let i = 0; i < palabraArray.length; i++) {
        // Convertimos la letra de la palabra a mayúsculas para comparar
        if (aciertos.includes(palabraArray[i].toUpperCase())) {
            res += palabraArray[i] + " ";
        } else {
            res += "_ ";
        }
    }
    parrafo.textContent = res;
    divGuiones.appendChild(parrafo);
}

// [+] ----- Funcion finJuego ----- [+]
function finJuego() {
    // Si quedan 0 intentos termina la partida y mostramos el mensaje
    if (intentos == 0) {
        msgFinal.textContent = "Has perdido!";
        deshabilitarBotones();
    // Si no quedan guiones termina la partida y mostramos el mensaje    
    } else if (comprobarGuiones()) {
        msgFinal.textContent = "Has ganado!";
        deshabilitarBotones();
    }
}


// [+] ----- Funcion comprobarGuiones ----- [+]
function comprobarGuiones() {
    let guionesArr = Array.from(divGuiones.textContent);
    return !guionesArr.includes('_'); // Retorna true si no hay guiones
}
    
// [+] ----- Funcion deshabilitarBotones ----- [+]
function deshabilitarBotones() {
    document.querySelectorAll("#botonesLetras button").forEach(boton => {
        boton.disabled = true;
    });
}

// [+] ----- Funcion comprobarIntentos ----- [+]
function comprobarIntentos() {
    const letra = this.textContent.toUpperCase();
    let acierto = false;

    // Iteramos por la palabra y comprobamos si contiene la letra
    for (let i = 0; i < palabraArr.length; i++) {
        if (palabraArr[i].toUpperCase() === letra) {
            acierto = true;
        }
    }

    // ACIERTOS
    if (acierto && !letrasAcertadas.includes(letra)) {
        letrasAcertadas.push(letra);
        aciertosH3.innerText = "Bien!"
    } else {
    // FALLOS    
        intentos--
        intentosSpan.innerText = intentos
        aciertosH3.innerText = "Mal!"
        actualizarImagen();
    }
    // Actualizamos la visualización de la palabra (con aciertos y guiones)
    pintarGuiones(palabra, letrasAcertadas);
    finJuego();
}

// [+] ----- Función inicio ----- [+]
function inicio() {
    // Reiniciamos las variables
    palabra = escogerPalabra(palabras)
    palabraArr = Array.from(palabra)
    intentos = 6;
    intentosSpan.innerText = intentos
    letrasAcertadas = [];
    aciertosH3.textContent = "";
    msgFinal.textContent = "";
    
    // Reiniciamos las imágenes
    document.querySelectorAll('picture img').forEach(img => {
        img.classList.remove('fade-in');
    });
    document.getElementById('image6').classList.add('fade-in');

    // Creamos los botones y los guiones
    pintarGuiones(palabra, letrasAcertadas);
    crearBotones(abecedario);
}
