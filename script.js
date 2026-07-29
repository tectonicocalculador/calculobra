// =======================================
// CALCULOBRA v0.3
// Gestión de Espacios
// =======================================

const espacios = [];

let espacioSeleccionado = null;

// =======================================
// INICIO
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("nuevoEspacio");

    boton.addEventListener("click", agregarEspacio);

    renderizarEspacios();

    renderizarTareas();

});

// =======================================
// AGREGAR ESPACIO
// =======================================

function agregarEspacio(){

    const nombre = prompt("Nombre del espacio");

    if(!nombre) return;

    espacios.push({

        id: Date.now(),

        nombre: nombre,

        estado: "⚪",

        tareas: []

    });

    renderizarEspacios();

}

// =======================================
// RENDERIZAR ESPACIOS
// =======================================

function renderizarEspacios(){

    const contenedor = document.getElementById("espacios");

    contenedor.innerHTML = "";

    espacios.forEach((espacio, indice)=>{

        const div = document.createElement("div");

        div.className = "parte";

        if(indice === espacioSeleccionado){
            div.classList.add("activa");
        }

        div.innerHTML = `
            <span>${espacio.estado} ${espacio.nombre}</span>
        `;

        div.addEventListener("click",()=>{

            espacioSeleccionado = indice;

            renderizarEspacios();

            renderizarTareas();

        });

        contenedor.appendChild(div);

    });

}

// =======================================
// TAREAS
// =======================================

function renderizarTareas(){

    const contenedor = document.getElementById("tareas");

    if(espacioSeleccionado === null){

        contenedor.innerHTML = `
            <p>Seleccione un espacio.</p>
        `;

        return;

    }

    const espacio = espacios[espacioSeleccionado];

    contenedor.innerHTML = `

        <h3>${espacio.nombre}</h3>

        <button id="nuevaTarea">
            ➕ Nueva tarea
        </button>

        <p style="margin-top:20px;color:#777;">
            Este espacio todavía no tiene tareas.
        </p>

    `;

}
