 // ==========================================
// VARIABLES
// ==========================================

var canvas;
var ctx;

var serpiente = [];

var fruta = {
    x: 5,
    y: 5
};

var direccion = "derecha";
var nuevaDireccion = "derecha";

var puntos = 0;
var descuento = 0;

var longitud = 3;
var juegoActivo = false;

var intervalo;


// ==========================================
// INICIAR
// ==========================================

window.onload = function () {

    canvas = document.getElementById("gc");
    ctx = canvas.getContext("2d");

    prepararJuego();

};


// ==========================================
// PREPARAR JUEGO
// ==========================================

function prepararJuego() {

    serpiente = [];

    serpiente.push({
        x: 5,
        y: 5
    });

    serpiente.push({
        x: 4,
        y: 5
    });

    serpiente.push({
        x: 3,
        y: 5
    });

    fruta.x = Math.floor(Math.random() * 10);
    fruta.y = Math.floor(Math.random() * 10);

    direccion = "derecha";
    nuevaDireccion = "derecha";

    longitud = 3;
    juegoActivo = true;

    actualizarInformacion();

    document.getElementById("mensaje").innerHTML =
        "¡Come la fruta para conseguir puntos!";

    dibujar();

    clearInterval(intervalo);

    intervalo = setInterval(mover, 150);
}


// ==========================================
// CALCULAR DESCUENTO
// ==========================================

function calcularDescuento() {

    descuento = puntos * 2;

    // Máximo 20%

    if (descuento > 20) {
        descuento = 20;
    }

    return descuento;
}


// ==========================================
// GUARDAR DESCUENTO
// ==========================================

function guardarDescuento() {

    calcularDescuento();

    // Guardamos el descuento en el navegador
    localStorage.setItem(
        "descuentoSolarii",
        descuento.toString()
    );

}


// ==========================================
// ACTUALIZAR INFORMACION
// ==========================================

function actualizarInformacion() {

    calcularDescuento();

    document.getElementById("puntos").innerHTML =
        "Puntos: " + puntos;

    document.getElementById("descuento").innerHTML =
        "Descuento: " + descuento + "%";
}


// ==========================================
// MOVER SERPIENTE
// ==========================================

function mover() {

    if (juegoActivo == false) {
        return;
    }

    direccion = nuevaDireccion;

    var cabeza = {
        x: serpiente[0].x,
        y: serpiente[0].y
    };


    // ======================================
    // DIRECCIONES
    // ======================================

    if (direccion == "arriba") {
        cabeza.y--;
    }

    if (direccion == "abajo") {
        cabeza.y++;
    }

    if (direccion == "izquierda") {
        cabeza.x--;
    }

    if (direccion == "derecha") {
        cabeza.x++;
    }


    // ======================================
    // CHOCAR CON PARED
    // ======================================

    if (cabeza.x < 0) {
        perder();
        return;
    }

    if (cabeza.x >= 10) {
        perder();
        return;
    }

    if (cabeza.y < 0) {
        perder();
        return;
    }

    if (cabeza.y >= 10) {
        perder();
        return;
    }


    // ======================================
    // CHOCAR CON EL CUERPO
    // ======================================

    for (var i = 0; i < serpiente.length; i++) {

        if (
            cabeza.x == serpiente[i].x &&
            cabeza.y == serpiente[i].y
        ) {

            perder();
            return;
        }
    }


    // Agregar cabeza

    serpiente.unshift(cabeza);


    // ======================================
    // COMER FRUTA
    // ======================================

    if (
        cabeza.x == fruta.x &&
        cabeza.y == fruta.y
    ) {

        puntos++;
        longitud++;

        actualizarInformacion();


        // ==================================
        // MENSAJES DE DESCUENTO
        // ==================================

        if (puntos == 5) {

            document.getElementById("mensaje").innerHTML =
                "¡Excelente! Has conseguido 10% de descuento.";
        }

        if (puntos >= 10) {

            document.getElementById("mensaje").innerHTML =
                "¡Premio máximo! Has conseguido 20% de descuento.";
        }

        nuevaFruta();
    }


    // Quitar cola

    while (serpiente.length > longitud) {
        serpiente.pop();
    }

    dibujar();
}


// ==========================================
// NUEVA FRUTA
// ==========================================

function nuevaFruta() {

    fruta.x = Math.floor(Math.random() * 10);
    fruta.y = Math.floor(Math.random() * 10);


    // Evitar que aparezca dentro de la serpiente

    for (var i = 0; i < serpiente.length; i++) {

        if (
            fruta.x == serpiente[i].x &&
            fruta.y == serpiente[i].y
        ) {

            nuevaFruta();
            return;
        }
    }
}


// ==========================================
// PERDER
// ==========================================

function perder() {

    juegoActivo = false;

    clearInterval(intervalo);

    calcularDescuento();

    actualizarInformacion();


    // ======================================
    // GUARDAR EL DESCUENTO
    // ======================================

    guardarDescuento();


    // ======================================
    // MENSAJE
    // ======================================

    if (puntos == 0) {

        document.getElementById("mensaje").innerHTML =
            "Perdiste. No obtuviste descuento.";

    } else {

        document.getElementById("mensaje").innerHTML =
            "¡Perdiste! Terminaste con " +
            puntos +
            " puntos y ganaste " +
            descuento +
            "% de descuento. Pulsa ENTER para volver a jugar.";
    }

    dibujar();
}


// ==========================================
// DIBUJAR
// ==========================================

function dibujar() {

    // Fondo

    ctx.fillStyle = "#222";

    ctx.fillRect(
        0,
        0,
        400,
        400
    );


    // Cuadrícula

    ctx.strokeStyle = "#333";

    for (var i = 0; i <= 10; i++) {

        ctx.beginPath();

        ctx.moveTo(
            i * 40,
            0
        );

        ctx.lineTo(
            i * 40,
            400
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            0,
            i * 40
        );

        ctx.lineTo(
            400,
            i * 40
        );

        ctx.stroke();
    }


    // ======================================
    // SERPIENTE
    // ======================================

    for (var i = 0; i < serpiente.length; i++) {

        if (i == 0) {
            ctx.fillStyle = "#8bea62";
        } else {
            ctx.fillStyle = "#53a653";
        }

        ctx.fillRect(
            serpiente[i].x * 40 + 2,
            serpiente[i].y * 40 + 2,
            36,
            36
        );
    }


    // ======================================
    // FRUTA
    // ======================================

    ctx.fillStyle = "#ff3333";

    ctx.fillRect(
        fruta.x * 40 + 5,
        fruta.y * 40 + 5,
        30,
        30
    );


    // ======================================
    // INFORMACION EN EL JUEGO
    // ======================================

    ctx.fillStyle = "white";

    ctx.font = "bold 16px Arial";

    ctx.fillText(
        "Puntos: " + puntos,
        15,
        25
    );

    ctx.fillText(
        "Descuento: " + descuento + "%",
        15,
        47
    );


    // ======================================
    // PANTALLA CUANDO PIERDE
    // ======================================

    if (juegoActivo == false) {

        ctx.fillStyle =
            "rgba(0, 0, 0, 0.65)";

        ctx.fillRect(
            0,
            150,
            400,
            100
        );

        ctx.fillStyle = "white";

        ctx.font = "bold 20px Arial";

        ctx.fillText(
            "¡JUEGO TERMINADO!",
            90,
            190
        );

        ctx.font = "16px Arial";

        ctx.fillText(
            "Pulsa ENTER para jugar",
            105,
            220
        );
    }
}


// ==========================================
// TECLADO
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        // ARRIBA

        if (event.keyCode == 38) {

            if (direccion != "abajo") {
                nuevaDireccion = "arriba";
            }

            event.preventDefault();
        }


        // ABAJO

        if (event.keyCode == 40) {

            if (direccion != "arriba") {
                nuevaDireccion = "abajo";
            }

            event.preventDefault();
        }


        // IZQUIERDA

        if (event.keyCode == 37) {

            if (direccion != "derecha") {
                nuevaDireccion = "izquierda";
            }

            event.preventDefault();
        }


        // DERECHA

        if (event.keyCode == 39) {

            if (direccion != "izquierda") {
                nuevaDireccion = "derecha";
            }

            event.preventDefault();
        }


        // ENTER

        if (event.keyCode == 13) {

            if (juegoActivo == false) {

                puntos = 0;

                prepararJuego();
            }
        }


        // ESPACIO

        if (event.keyCode == 32) {

            if (juegoActivo == false) {

                puntos = 0;

                prepararJuego();
            }

            event.preventDefault();
        }

    }
);


// ==========================================
// BOTONES PARA CELULAR
// ==========================================

function cambiarDireccion(nueva) {

    if (nueva == "arriba") {

        if (direccion != "abajo") {
            nuevaDireccion = "arriba";
        }
    }


    if (nueva == "abajo") {

        if (direccion != "arriba") {
            nuevaDireccion = "abajo";
        }
    }


    if (nueva == "izquierda") {

        if (direccion != "derecha") {
            nuevaDireccion = "izquierda";
        }
    }


    if (nueva == "derecha") {

        if (direccion != "izquierda") {
            nuevaDireccion = "derecha";
        }
    }
}


// ==========================================
// BOTONES
// ==========================================

function botonArriba() {
    cambiarDireccion("arriba");
}

function botonAbajo() {
    cambiarDireccion("abajo");
}

function botonIzquierda() {
    cambiarDireccion("izquierda");
}

function botonDerecha() {
    cambiarDireccion("derecha");
}