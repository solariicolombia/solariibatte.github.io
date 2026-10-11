document.addEventListener("DOMContentLoaded", () => {
    // 1. Verificar si hay un porcentaje guardado del juego JuegAhorro
    const descuentoGuardado = localStorage.getItem("descuentoSolarii");

    if (descuentoGuardado) {
        const alerta = document.getElementById("alerta-descuento");
        const spanPorcentaje = document.getElementById("porcentaje-ganado");
        const inputAsunto = document.getElementById("asunto");

        // Mostrar la alerta en la sección de contacto
        if (alerta && spanPorcentaje) {
            spanPorcentaje.textContent = descuentoGuardado;
            alerta.classList.remove("d-none");
        }

        // Rellenar o añadir una nota automática en el campo de asunto del formulario
        if (inputAsunto) {
            inputAsunto.value = `Hola, me gustaría adquirir un producto. Gané un ${descuentoGuardado}% de descuento en JuegAhorro.`;
        }
    }
});

/ Ejemplo de lo que debes poner en tu script de JuegAhorro al finalizar el juego:
let descuentoObtenido = 20; // El porcentaje que ganó el usuario
localStorage.setItem("descuentoSolarii", descuentoObtenido);

// Opcional: Redirigir al formulario de contacto de la página principal
window.location.href = "index.html#contacto";
