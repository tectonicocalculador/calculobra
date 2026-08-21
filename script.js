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
                    moduloCalculo: null,
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

        const nombre = document.createElement("span");
        nombre.textContent = sector.nombre;

        const acciones = document.createElement("div");
        acciones.className = "acciones-sector";

        const editar = document.createElement("button");
        editar.className = "boton-sector editar";
        editar.textContent = "✎";
        editar.title = "Editar sector";

        const eliminar = document.createElement("button");
        eliminar.className = "boton-sector eliminar";
        eliminar.textContent = "✕";
        eliminar.title = "Eliminar sector";

        editar.onclick = (e) => {
            e.stopPropagation();

            const nuevoNombre = prompt(
                "Nombre del sector:",
                sector.nombre
            );

            if (!nuevoNombre || !nuevoNombre.trim()) return;

            sector.nombre = nuevoNombre.trim();

            guardarObra();
            renderSectores();
        };

        eliminar.onclick = (e) => {
            e.stopPropagation();

            const confirmar = confirm(
                `¿Seguro que querés eliminar "${sector.nombre}"?\n\nTambién se eliminarán los rubros que contiene.`
            );

            if (!confirmar) return;

            obra.sectores = obra.sectores.filter(
                s => s.id !== sector.id
            );

            if (sectorSeleccionadoId === sector.id) {

                if (obra.sectores.length > 0) {
                    sectorSeleccionadoId =
                        obra.sectores[0].id;
                } else {
                    sectorSeleccionadoId = null;
                }

                rubroSeleccionadoId = null;
            }

            guardarObra();

            renderSectores();
            renderRubros();
            renderDetalle();
        };

        acciones.appendChild(editar);
        acciones.appendChild(eliminar);

        div.appendChild(nombre);
        div.appendChild(acciones);

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

        // ==========================
        // INFORMACIÓN DEL RUBRO
        // ==========================

        const informacion = document.createElement("div");

        informacion.className = "informacion-rubro";

        const titulo = document.createElement("div");

        titulo.className = "titulo";
        titulo.textContent = r.tipo;

        informacion.appendChild(titulo);

        // Mostrar descripción si existe

        if (r.descripcion && r.descripcion.trim() !== "") {

            const descripcion = document.createElement("div");

            descripcion.className = "descripcion-rubro";
            descripcion.textContent = r.descripcion;

            informacion.appendChild(descripcion);

        }

        // ==========================
        // ACCIONES
        // ==========================

        const acciones = document.createElement("div");

        acciones.className = "acciones-rubro";

        // BOTÓN EDITAR DESCRIPCIÓN

        const editar = document.createElement("button");

        editar.className = "boton-rubro editar";
        editar.textContent = "✎";
        editar.title = "Editar descripción";

        editar.onclick = (e) => {

            e.stopPropagation();

            const nuevaDescripcion = prompt(
                `Descripción de "${r.tipo}":`,
                r.descripcion || ""
            );

            if (nuevaDescripcion === null) return;

            r.descripcion = nuevaDescripcion.trim();

            guardarObra();

            renderRubros();
            renderDetalle();

        };

        // BOTÓN ELIMINAR

        const eliminar = document.createElement("button");

        eliminar.className = "boton-rubro eliminar";
        eliminar.textContent = "✕";
        eliminar.title = "Eliminar rubro";

        eliminar.onclick = (e) => {

            e.stopPropagation();

            const confirmar = confirm(
                `¿Seguro que querés eliminar "${r.tipo}"?`
            );

            if (!confirmar) return;

            sector.rubros = sector.rubros.filter(
                rubro => rubro.id !== r.id
            );

            if (rubroSeleccionadoId === r.id) {
                rubroSeleccionadoId = null;
            }

            guardarObra();

            renderRubros();
            renderDetalle();

        };

        acciones.appendChild(editar);
        acciones.appendChild(eliminar);

        // ==========================
        // ARMAR RUBRO
        // ==========================

        div.appendChild(informacion);
        div.appendChild(acciones);

        // ==========================
        // SELECCIONAR RUBRO
        // ==========================

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

    // ==========================================
    // SI EL RUBRO NO ES MAMPOSTERÍA
    // ==========================================

    if (rubro.calculadora !== "mamposteria") {

        contDetalle.innerHTML = `
            <h3>${rubro.tipo}</h3>

            ${
                rubro.descripcion
                    ? `<p>${rubro.descripcion}</p>`
                    : ""
            }

            <hr style="margin:20px 0">

            <div class="contenido-calculadora">
                <p>Calculadora próximamente.</p>
            </div>
        `;

        return;
    }

    // ==========================================
    // DATOS DEL RUBRO
    // ==========================================

    if (!rubro.datos) {
        rubro.datos = {};
    }

    // ==========================================
    // MÓDULOS DE MAMPOSTERÍA
    // ==========================================

    const modulosMamposteria = baseCalculos.filter(
    modulo => modulo.categoria === "mamposterias"
    );

    // ==========================================
    // MÓDULO SELECCIONADO
    // ==========================================

    const moduloSeleccionado =
        modulosMamposteria.find(
            modulo => modulo.id === rubro.moduloCalculo
        );

    // ==========================================
    // MOSTRAR DETALLE
    // ==========================================

    contDetalle.innerHTML = `

        <h3>${rubro.tipo}</h3>

        ${
            rubro.descripcion
                ? `<p class="descripcion-detalle">
                    ${rubro.descripcion}
                   </p>`
                : ""
        }

        <hr style="margin:20px 0">

        <div class="contenido-calculadora">

            <label>
                Tipo de mampostería
            </label>

            <select id="selectorModulo">

                <option value="">
                    Seleccionar tipo...
                </option>

                ${modulosMamposteria.map(modulo => `
                    <option
                        value="${modulo.id}"
                        ${rubro.moduloCalculo === modulo.id ? "selected" : ""}
                    >
                        ${modulo.nombre}
                    </option>
                `).join("")}

            </select>

            ${
                moduloSeleccionado
                    ? `
                        <div style="margin-top:20px">

                            <label>
                                Superficie
                            </label>

                            <div style="
                                display:flex;
                                align-items:center;
                                gap:10px;
                                margin-top:8px;
                            ">

                                <input
                                    type="number"
                                    id="superficieMamposteria"
                                    min="0"
                                    step="0.01"
                                    value="${rubro.datos.superficie || ""}"
                                    placeholder="0,00"
                                >

                                <span>${moduloSeleccionado.unidad}</span>

                            </div>

                        </div>

                        <div
                            id="resultadoMamposteria"
                            style="margin-top:25px"
                        ></div>
                    `
                    : `
                        <p style="
                            margin-top:20px;
                            color:#95a5a6;
                        ">
                            Seleccioná el tipo de mampostería para comenzar.
                        </p>
                    `
            }

        </div>
    `;

    // ==========================================
    // CAMBIO DE MÓDULO
    // ==========================================

    const selectorModulo =
        document.getElementById("selectorModulo");

    selectorModulo.addEventListener("change", () => {

        rubro.moduloCalculo =
            selectorModulo.value || null;

        rubro.datos.superficie = "";

        guardarObra();

        function renderDetalle() {

    const sector = obtenerSector(sectorSeleccionadoId);

    if (!sector) {
        contDetalle.innerHTML =
            '<p class="mensaje-vacio">Seleccione un sector para comenzar.</p>';
        return;
    }

    if (!sector.rubros || sector.rubros.length === 0) {
        contDetalle.innerHTML =
            '<p class="mensaje-vacio">Agregue un rubro para comenzar.</p>';
        return;
    }

    // =====================================================
    // ACUMULADOR GENERAL DE MATERIALES
    // =====================================================

    const acumuladoMateriales = {};

    // =====================================================
    // GENERAR DETALLE DE CADA RUBRO
    // =====================================================

    let htmlRubros = "";

    sector.rubros.forEach(rubro => {

        // -------------------------------------------------
        // RUBROS QUE TODAVÍA NO TIENEN CALCULADORA
        // -------------------------------------------------

        if (rubro.calculadora !== "mamposteria") {

            htmlRubros += `
                <div class="detalle-rubro" style="margin-bottom:30px;">

                    <h3>${rubro.tipo}</h3>

                    ${
                        rubro.descripcion
                            ? `<p class="descripcion-detalle">
                                ${rubro.descripcion}
                               </p>`
                            : ""
                    }

                    <hr style="margin:20px 0">

                    <div class="contenido-calculadora">
                        <p>Calculadora próximamente.</p>
                    </div>

                </div>
            `;

            return;
        }

        // -------------------------------------------------
        // DATOS DE MAMPOSTERÍA
        // -------------------------------------------------

        if (!rubro.datos) {
            rubro.datos = {};
        }

        const modulosMamposteria = baseCalculos.filter(
            modulo => modulo.categoria === "mamposterias"
        );

        const moduloSeleccionado =
            modulosMamposteria.find(
                modulo => modulo.id === rubro.moduloCalculo
            );

        let superficie = parseFloat(rubro.datos.superficie);

        // -------------------------------------------------
        // SUMAR MATERIALES AL ACUMULADO
        // -------------------------------------------------

        if (
            moduloSeleccionado &&
            !isNaN(superficie) &&
            superficie > 0
        ) {

            moduloSeleccionado.materiales.forEach(material => {

                const cantidad =
                    material.cantidadPorUnidad * superficie;

                if (!acumuladoMateriales[material.nombre]) {

                    acumuladoMateriales[material.nombre] = {
                        cantidad: 0,
                        unidad: material.unidad
                    };

                }

                acumuladoMateriales[material.nombre].cantidad += cantidad;

            });

        }

        // -------------------------------------------------
        // MOSTRAR RUBRO
        // -------------------------------------------------

        htmlRubros += `
            <div class="detalle-rubro" style="margin-bottom:35px;">

                <h3>${rubro.tipo}</h3>

                ${
                    rubro.descripcion
                        ? `<p class="descripcion-detalle">
                            ${rubro.descripcion}
                           </p>`
                        : ""
                }

                <hr style="margin:20px 0">

                <div class="contenido-calculadora">

                    <label>
                        Tipo de mampostería
                    </label>

                    <select
                        class="selectorModuloDetalle"
                        data-rubro-id="${rubro.id}"
                    >

                        <option value="">
                            Seleccionar tipo...
                        </option>

                        ${modulosMamposteria.map(modulo => `
                            <option
                                value="${modulo.id}"
                                ${
                                    rubro.moduloCalculo === modulo.id
                                        ? "selected"
                                        : ""
                                }
                            >
                                ${modulo.nombre}
                            </option>
                        `).join("")}

                    </select>

                    ${
                        moduloSeleccionado
                            ? `

                                <div style="margin-top:20px">

                                    <label>
                                        Superficie
                                    </label>

                                    <div style="
                                        display:flex;
                                        align-items:center;
                                        gap:10px;
                                        margin-top:8px;
                                    ">

                                        <input
                                            type="number"
                                            class="superficieDetalle"
                                            data-rubro-id="${rubro.id}"
                                            min="0"
                                            step="0.01"
                                            value="${
                                                rubro.datos.superficie || ""
                                            }"
                                            placeholder="0,00"
                                        >

                                        <span>
                                            ${moduloSeleccionado.unidad}
                                        </span>

                                    </div>

                                </div>

                                <div style="margin-top:25px">

                                    <h3>
                                        Materiales necesarios
                                    </h3>

                                    ${

                                        !isNaN(superficie) &&
                                        superficie > 0

                                            ?

                                        moduloSeleccionado.materiales.map(
                                            material => {

                                                const cantidad =
                                                    material.cantidadPorUnidad *
                                                    superficie;

                                                return `
                                                    <div style="
                                                        display:flex;
                                                        justify-content:space-between;
                                                        padding:10px 0;
                                                        border-bottom:1px solid #eeeeee;
                                                    ">

                                                        <span>
                                                            <strong>
                                                                ${material.nombre}
                                                            </strong>
                                                        </span>

                                                        <span>
                                                            ${cantidad}
                                                            ${material.unidad}
                                                        </span>

                                                    </div>
                                                `;

                                            }
                                        ).join("")

                                            :

                                        `<p style="
                                            color:#95a5a6;
                                            margin-top:15px;
                                        ">
                                            Ingresá una superficie para calcular.
                                        </p>`

                                    }

                                </div>

                            `

                            :

                            `
                                <p style="
                                    margin-top:20px;
                                    color:#95a5a6;
                                ">
                                    Seleccioná el tipo de mampostería para comenzar.
                                </p>
                            `
                    }

                </div>

            </div>
        `;
    });

    // =====================================================
    // ACUMULADO GENERAL
    // =====================================================

    const materiales = Object.entries(acumuladoMateriales);

    let htmlAcumulado = "";

    if (materiales.length > 0) {

        htmlAcumulado = `

            <div class="acumulado-materiales"
                 style="
                    margin-top:40px;
                    padding-top:25px;
                    border-top:2px solid #222;
                 ">

                <h2 style="margin-bottom:20px;">
                    ACUMULADO DE MATERIALES
                </h2>

                ${materiales.map(([nombre, datos]) => `

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        padding:12px 0;
                        border-bottom:1px solid #eeeeee;
                    ">

                        <span>
                            <strong>${nombre}</strong>
                        </span>

                        <span>
                            ${datos.cantidad.toFixed(2)}
                            ${datos.unidad}
                        </span>

                    </div>

                `).join("")}

            </div>

        `;

    }

    // =====================================================
    // MOSTRAR TODO
    // =====================================================

    contDetalle.innerHTML = `
        ${htmlRubros}
        ${htmlAcumulado}
    `;

    // =====================================================
    // EVENTOS DE LOS SELECTORES
    // =====================================================

    document
        .querySelectorAll(".selectorModuloDetalle")
        .forEach(selector => {

            selector.addEventListener("change", () => {

                const rubroId =
                    Number(selector.dataset.rubroId);

                const rubro =
                    sector.rubros.find(r => r.id === rubroId);

                if (!rubro) return;

                rubro.moduloCalculo =
                    selector.value || null;

                rubro.datos = rubro.datos || {};

                rubro.datos.superficie = "";

                guardarObra();

                renderDetalle();

            });

        });

    // =====================================================
    // EVENTOS DE SUPERFICIE
    // =====================================================

    document
        .querySelectorAll(".superficieDetalle")
        .forEach(input => {

            input.addEventListener("input", () => {

                const rubroId =
                    Number(input.dataset.rubroId);

                const rubro =
                    sector.rubros.find(r => r.id === rubroId);

                if (!rubro) return;

                const valor =
                    parseFloat(input.value);

                if (isNaN(valor)) {

                    rubro.datos.superficie = "";

                } else {

                    rubro.datos.superficie = valor;

                }

                guardarObra();

                renderDetalle();

            });

        });

}

function mostrarResultadoMamposteria(modulo, superficie) {

    const contenedor = document.getElementById("resultadoMamposteria");

    if (!contenedor) return;

    if (superficie === null || superficie <= 0) {
        contenedor.innerHTML = "";
        return;
    }

    let html = `
        <h3 style="margin-bottom:15px;">
            Materiales necesarios
        </h3>
    `;

    modulo.materiales.forEach(material => {

        const cantidadTotal =
            material.cantidadPorUnidad * superficie;

        html += `
            <div style="
                display:flex;
                justify-content:space-between;
                padding:10px 0;
                border-bottom:1px solid #eeeeee;
            ">
                <span>
                    <strong>${material.nombre}</strong>
                </span>

                <span>
                    ${cantidadTotal} ${material.unidad}
                </span>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

renderSectores();
renderRubros();
renderDetalle(); 
