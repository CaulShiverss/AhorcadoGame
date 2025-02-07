// Array de palabras y función para escoger una aleatoria
const palabras = ["Camion", "Perro", "Ahorcado", "Portatil", "DonPollo"];
let intentos = 6
const intentosSpan = document.getElementById("intentos")
const aciertosH3 = document.getElementById("acierto")
const msgFinalH1 = document.getElementById("msg-final")

function escogerPalabra(palabras) {
    // Se elimina el "+1" para obtener un índice válido (0 hasta palabras.length - 1)
    let indice = Math.floor(Math.random() * palabras.length);
    return palabras[indice];
}

// Variables globales para almacenar el estado del juego
let ultimaLetraPulsada = "";
let letrasAcertadas = []; // Aquí se irán guardando las letras acertadas

// Array con el abecedario
const abecedario = Array.from("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ");

// Obtenemos los contenedores del DOM
let divBotones = document.getElementById("botonesLetras");
let divGuiones = document.getElementById("guiones");

// Escogemos la palabra y la convertimos a array para facilitar comparaciones
let palabra = escogerPalabra(palabras);
let palabraArr = Array.from(palabra);

// Función para crear y mostrar los botones de letras
function crearBotones(abecedario) {
    // Limpiamos el contenedor antes de agregar los botones
    divBotones.textContent = "";
    for (let i = 0; i < abecedario.length; i++) {
        let boton = document.createElement("button");
        boton.textContent = abecedario[i];
        
        // Al hacer clic, ocultamos el botón y actualizamos la última letra pulsada
        boton.addEventListener("click", function() {
            this.style.visibility = "hidden";
            ultimaLetraPulsada = this.textContent;
        });
        
        // Comprobamos si la letra es parte de la palabra y actualizamos los aciertos
        boton.addEventListener("click", comprobarIntentos);
        
        divBotones.appendChild(boton);
    }
}

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

// Función para pintar los guiones y las letras acertadas
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

function finJuego() {
    if (intentos == 0) {

    }
}

// Función para comprobar si la letra pulsada forma parte de la palabra
function comprobarIntentos() {
    // Convertimos la letra pulsada a mayúsculas para asegurar la comparación
    const letra = this.textContent.toUpperCase();
    let acierto = false;
    // Recorremos la palabra y comparamos cada letra (convertida a mayúsculas)
    for (let i = 0; i < palabraArr.length; i++) {
        if (palabraArr[i].toUpperCase() === letra) {
            acierto = true;
        }
    }
    // Si la letra es correcta y no se había añadido ya, la agregamos
    if (acierto && !letrasAcertadas.includes(letra)) {
        letrasAcertadas.push(letra);
        aciertosH3.innerText = "Acertaste"
    } else {
        intentos--
        intentosSpan.innerText = intentos
        aciertosH3.innerText = "Fallaste"
        actualizarImagen(); // <- Aquí actualizamos la imagen
    }
    // Actualizamos la visualización de la palabra (con aciertos y guiones)
    pintarGuiones(palabra, letrasAcertadas);
    return acierto;
}

// Función de inicio para preparar el juego
function inicio() {
    intentos = 6;
    intentosSpan.innerText = intentos

    letrasAcertadas = [];
    
    // Reiniciamos las imágenes
    document.querySelectorAll('picture img').forEach(img => {
        img.classList.remove('fade-in');
    });
    document.getElementById('image6').classList.add('fade-in');

    pintarGuiones(palabra, letrasAcertadas);
    crearBotones(abecedario);
}

// Llamamos a la función inicio una vez que el DOM se ha cargado
document.addEventListener("DOMContentLoaded", inicio);
