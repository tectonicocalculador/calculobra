// =====================================================
// CALCULOBRA | TECTONICO
// script.js - Versión 1.1
// =====================================================

const obra = JSON.parse(localStorage.getItem("calculobra")) || {
    sectores: []
};

let sectorSeleccionadoId =
    obra.sectores.length > 0 ? obra.sectores[0].id : null;

let rubroSeleccionadoId = null;

const contSectores = document.getElementById("sectores");
const contRubros = document.getElementById("rubros");
const contDetalle = document.getElementById("detalle");

const modal = document.getElementById("modalCatalogo");
const listaCatalogo = document.getElementById("listaCatalogo");
const buscarRubro = document.getElementById("buscarRubro");

document.getElementById("nuevoSector").addEventListener("click", crearSector);
document.getElementById("agregarRubro").addEventListener("click", abrirCatalogo);
document.getElementById("cerrarModal").addEventListener("click", cerrarCatalogo);

buscarRubro.addEventListener("input", cargarCatalogo);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarCatalogo();
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarCatalogo();
});

function guardarObra() {
    localStorage.setItem("calculobra", JSON.stringify(obra));
}

function generarId() {
    return Date.now() + Math.floor(Math.random() * 100000);
}

function obtenerSector(id) {
    return obra.sectores.find(s => s.id === id);
}

function obtenerRubro() {
    const sector = obtenerSector(sectorSeleccionadoId);
    if (!sector) return null;
    return sector.rubros.find(r => r.id === rubroSeleccionadoId);
}
function crearSector() {

    const nombre = prompt("Nombre del sector:");

    if (!nombre) return;

    obra.sectores.push({
        id: generarId(),
        nombre: nombre.trim(),
        rubros: []
    });

    sectorSeleccionadoId = obra.sectores[obra.sectores.length - 1].id;
    rubroSeleccionadoId = null;

    guardarObra();

    renderSectores();
    renderRubros();
    renderDetalle();
}

function abrirCatalogo() {

    console.log("sectorSeleccionadoId =", sectorSeleccionadoId);
    console.log("obra =", obra);

    if (sectorSeleccionadoId === null) {
        alert("Primero seleccione un sector.");
        return;
    }

    buscarRubro.value = "";

    modal.classList.remove("oculto");

    cargarCatalogo();

    buscarRubro.focus();

}

    
function cerrarCatalogo() {

    modal.classList.add("oculto");

    buscarRubro.value = "";

}

function cargarCatalogo() {

    const filtro = buscarRubro.value.toLowerCase();

    listaCatalogo.innerHTML = "";

    const categorias = [...new Set(catalogoRubros.map(r => r.categoria))];

    categorias.forEach(cat => {

        const items = catalogoRubros.filter(r =>
            r.categoria === cat &&
            r.nombre.toLowerCase().includes(filtro)
        );

        if (items.length === 0) return;

        const titulo = document.createElement("div");
        titulo.className = "categoria";
        titulo.textContent = cat;

        listaCatalogo.appendChild(titulo);

        items.forEach(r => {

            const div = document.createElement("div");

            div.className = "item-catalogo";

            div.innerHTML = `${r.icono} ${r.nombre}`;

            div.onclick = () => {

    const sector = obtenerSector(sectorSeleccionadoId);

    if (!sector) {
        alert("NO HAY SECTOR");
        return;
    }

    sector.rubros.push({
                    id: generarId(),
                    tipo: r.nombre,
                    descripcion: "",
                    calculadora: r.calculadora,
                    datos: {}
                });

                guardarObra();

                rubroSeleccionadoId =
                    sector.rubros[sector.rubros.length - 1].id;

                cerrarCatalogo();

                renderRubros();
                renderDetalle();

            };

            listaCatalogo.appendChild(div);

        });

    });

}

function renderSectores() {

    if (obra.sectores.length === 0) {
        contSectores.innerHTML =
            '<p class="mensaje-vacio">No hay sectores.</p>';
        return;
    }

    contSectores.innerHTML = "";

    obra.sectores.forEach(sector => {

        const div = document.createElement("div");

        div.className =
            "item-sector" +
            (sector.id === sectorSeleccionadoId ? " activo" : "");

        div.textContent = sector.nombre;
                div.onclick = () => {

            sectorSeleccionadoId = sector.id;
            rubroSeleccionadoId = null;

            renderSectores();
            renderRubros();
            renderDetalle();

        };

        contSectores.appendChild(div);

    });

}

function renderRubros() {

    const sector = obtenerSector(sectorSeleccionadoId);

    if (!sector) {

        contRubros.innerHTML =
            '<p class="mensaje-vacio">Seleccione un sector.</p>';

        return;

    }

    if (sector.rubros.length === 0) {

        contRubros.innerHTML =
            '<p class="mensaje-vacio">Todavía no hay rubros.</p>';

        return;

    }

    contRubros.innerHTML = "";

    sector.rubros.forEach(r => {

        const div = document.createElement("div");

        div.className =
            "item-rubro" +
            (r.id === rubroSeleccionadoId ? " activo" : "");

        div.innerHTML = `<div class="titulo">${r.tipo}</div>`;

        div.onclick = () => {

            rubroSeleccionadoId = r.id;

            renderRubros();
            renderDetalle();

        };

        contRubros.appendChild(div);

    });

}

function renderDetalle() {

    const rubro = obtenerRubro();

    if (!rubro) {

        contDetalle.innerHTML =
            '<p class="mensaje-vacio">Seleccione un rubro para comenzar.</p>';

        return;

    }
        contDetalle.innerHTML = `
        <h3>${rubro.tipo}</h3>
        <p>Calculadora: <strong>${rubro.calculadora}</strong></p>
        <hr style="margin:20px 0">

        <div class="contenido-calculadora">

            <p>Próximamente aparecerá aquí el formulario específico.</p>

        </div>
    `;

}

renderSectores();
renderRubros();
renderDetalle();
