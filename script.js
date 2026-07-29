// =======================================
// CALCULOBRA v0.2
// Gestión de Espacios
// =======================================

const espacios = [];

let espacioSeleccionado = null;

// =======================================
// INICIO
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("nuevaParte");

    if (boton) {
        boton.addEventListener("click", agregarEspacio);
    }

    renderizarEspacios();

});

// =======================================
// AGREGAR ESPACIO
// =======================================

function agregarEspacio(){

    const nombre = prompt("Nombre del espacio");

    if(!nombre) return;

    espacios.push({

        nombre: nombre,

        estado: "⚪",

        tareas: []

    });

    renderizarEspacios();

}

// =======================================
// MOSTRAR ESPACIOS
// =======================================

function renderizarEspacios(){

    const contenedor = document.getElementById("partes");

    if(!contenedor) return;

    contenedor.innerHTML = "";

    espacios.forEach((espacio, indice)=>{

        const div = document.createElement("div");

        div.className = "parte";

        if(indice === espacioSeleccionado){
            div.classList.add("activa");
        }

        div.innerHTML = `${espacio.estado} ${espacio.nombre}`;

        div.onclick = () => selecionarEspacio(indice);

        contenedor.appendChild(div);

    });

}

// =======================================
// SELECCIONAR ESPACIO
// =======================================

function selecionarEspacio(indice){

    espacioSeleccionado = indice;

    renderizarEspacios();

    renderizarTareas();

}

// =======================================
// MOSTRAR TAREAS
// =======================================

function renderizarTareas(){

    const contenedor = document.getElementById("tareas");

    if(!contenedor) return;

    contenedor.innerHTML = "";

    if(espacioSeleccionado === null){

        contenedor.innerHTML = `
            <p>Seleccione un espacio.</p>
        `;

        return;

    }

    const tareas = espacios[espacioSeleccionado].tareas;

    if(tareas.length === 0){

        contenedor.innerHTML = `
            <p>Este espacio todavía no tiene tareas.</p>
        `;

        return;

    }

    tareas.forEach((tarea)=>{

        contenedor.innerHTML += `
            <div class="tarea">
                ${tarea}
            </div>
        `;

    });

}
