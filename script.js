// ================================
// CALCULOBRA v0.1
// ================================

const partes = [
    {
        nombre: "Medianera Norte",
        estado: "🟢"
    },
    {
        nombre: "Cocina",
        estado: "🟡"
    },
    {
        nombre: "Baño",
        estado: "⚪"
    }
];

// ================================
// AGREGAR NUEVA PARTE
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("nuevaParte");

    if (boton) {

        boton.addEventListener("click", agregarParte);

    }

});

function agregarParte(){

    const nombre = prompt("Nombre de la nueva parte de la obra");

    if(!nombre) return;

    partes.push({

        nombre:nombre,

        estado:"⚪"

    });

    renderizarPartes();

}

// ================================
// MOSTRAR PARTES
// ================================

function renderizarPartes(){

    const contenedor = document.getElementById("partes");

    if(!contenedor) return;

    contenedor.innerHTML="";

    partes.forEach((parte)=>{

        contenedor.innerHTML += `

        <div class="parte">

            ${parte.estado} ${parte.nombre}

        </div>

        `;

    });

}

document.addEventListener("DOMContentLoaded",renderizarPartes);
