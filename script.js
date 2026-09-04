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
    calculadora:
    r.calculadora ||
    (r.categoria === "mamposterias" ? "mamposteria" :
     r.categoria === "revoques" ? r.tipoRevoque :
     r.categoria === "carpetas" ? "carpeta" :
r.categoria === "morteros_pisos" ? "mortero_pisos" :
r.categoria === "hormigon" ? "hormigon" :
null),
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

// =================================================
// NORMALIZAR CALCULADORA DEL RUBRO
// =================================================

if (
    rubro.tipo &&
    rubro.tipo.toLowerCase() === "carpeta"
) {
    rubro.calculadora = "carpeta";
}

        // =================================================
        // MAMPOSTERÍA
        // =================================================

        if (rubro.calculadora === "mamposteria") {

            if (!rubro.datos) {
                rubro.datos = {};
            }

            const modulos = baseCalculos.filter(
                modulo => modulo.categoria === "mamposterias"
            );

            const moduloSeleccionado =
                modulos.find(
                    modulo => modulo.id === rubro.moduloCalculo
                );

            const superficie =
    parseFloat(String(rubro.datos.superficie).replace(",", "."));

            // ---------------------------------------------
            // SUMAR AL ACUMULADO
            // ---------------------------------------------

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

            // ---------------------------------------------
            // MOSTRAR MAMPOSTERÍA
            // ---------------------------------------------

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

                            ${modulos.map(modulo => `
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
                                                type="text"
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
                                                                ${cantidad.toFixed(2)}
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

            return;
        }


        // =================================================
        // REVOQUES
        // =================================================

        if (
    rubro.calculadora === "revoque_grueso" ||
    rubro.calculadora === "revoque_fino" ||
    rubro.calculadora === "azotado_hidrofugo"
) {

            if (!rubro.datos) {
                rubro.datos = {};
            }

            const tipoRevoque = rubro.calculadora;

            const modulos = baseCalculos.filter(
                modulo =>
                    modulo.categoria === "revoques" &&
                    modulo.tipoRevoque === tipoRevoque
            );

            const moduloSeleccionado =
                modulos.find(
                    modulo => modulo.id === rubro.moduloCalculo
                );

            const superficie =
    parseFloat(String(rubro.datos.superficie).replace(",", "."));

            // ---------------------------------------------
            // SUMAR AL ACUMULADO
            // ---------------------------------------------

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

            // ---------------------------------------------
            // MOSTRAR REVOQUE
            // ---------------------------------------------

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
                            Tipo de revoque
                        </label>

                        <select
                            class="selectorModuloDetalle"
                            data-rubro-id="${rubro.id}"
                        >

                            <option value="">
                                Seleccionar tipo...
                            </option>

                            ${modulos.map(modulo => `
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
                                                type="text"
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
                                                                ${cantidad.toFixed(2)}
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
                                        Seleccioná el tipo de revoque para comenzar.
                                    </p>
                                `
                        }

                    </div>

                </div>
            `;

            return;
        }

// =================================================
// CARPETAS
// =================================================

if (rubro.calculadora === "carpeta") {

    if (!rubro.datos) {
        rubro.datos = {};
    }

    const modulos = baseCalculos.filter(
        modulo => modulo.categoria === "carpetas"
    );

    const moduloSeleccionado =
        modulos.find(
            modulo => modulo.id === rubro.moduloCalculo
        );

    const superficie =
        parseFloat(
            String(rubro.datos.superficie).replace(",", ".")
        );

    // ---------------------------------------------
    // SUMAR AL ACUMULADO
    // ---------------------------------------------

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

    // ---------------------------------------------
    // MOSTRAR CARPETA
    // ---------------------------------------------

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
                    Tipo de carpeta
                </label>

                <select
                    class="selectorModuloDetalle"
                    data-rubro-id="${rubro.id}"
                >

                    <option value="">
                        Seleccionar tipo...
                    </option>

                    ${modulos.map(modulo => `
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
                                        type="text"
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
                                                        ${cantidad.toFixed(2)}
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
                                Seleccioná el tipo de carpeta para comenzar.
                            </p>
                        `
                }

            </div>

        </div>
    `;

    return;
}

// =================================================
// MORTEROS PARA PISOS
// =================================================
if (rubro.calculadora === "mortero_pisos") {

    rubro.datos = rubro.datos || {};

    const modulos = baseCalculos.filter(
        modulo => modulo.categoria === "morteros_pisos"
    );

    if (modulos.length === 0) {
        contDetalle.innerHTML += `
            <p>No hay cálculos disponibles para este rubro.</p>
        `;
        return;
    }

    let moduloSeleccionado = modulos.find(
        modulo => modulo.id === rubro.moduloCalculo
    );

    if (!moduloSeleccionado) {
        moduloSeleccionado = modulos[0];
        rubro.moduloCalculo = moduloSeleccionado.id;
    }

    let superficie = parseFloat(
        (rubro.datos.superficie || "").toString().replace(",", ".")
    );

    if (isNaN(superficie)) {
        superficie = 0;
    }

    moduloSeleccionado.materiales.forEach(material => {

    const cantidad = superficie * material.cantidadPorUnidad;

        if (!acumuladoMateriales[material.nombre]) {
            acumuladoMateriales[material.nombre] = {
                cantidad: 0,
                unidadCompra: material.unidadCompra
            };
        }

        acumuladoMateriales[material.nombre].cantidad += cantidad;
    });

    htmlRubros += `
        <div class="bloqueRubro">

            <label>Tipo de mortero para pisos:</label>

            <select class="selectorModuloDetalle"
                    data-rubro-id="${rubro.id}">

                ${modulos.map(modulo => `
                    <option value="${modulo.id}"
                        ${modulo.id === rubro.moduloCalculo ? "selected" : ""}>
                        ${modulo.nombre}
                    </option>
                `).join("")}

            </select>

            <label>Superficie (m²):</label>

            <input
                type="text"
                inputmode="decimal"
                class="superficieDetalle"
                data-rubro-id="${rubro.id}"
                value="${rubro.datos.superficie || ""}"
                placeholder="Ej: 100"
            >

            <div class="materialesRubro">

                ${moduloSeleccionado.materiales.map(material => {

                    const cantidad = superficie * material.cantidadPorUnidad;

                    return `
                        <div>
                            <strong>${material.nombre}:</strong>
                            ${cantidad.toFixed(2)}
                            ${material.unidadCompra}
                        </div>
                    `;

                }).join("")}

            </div>

        </div>
    `;

    return;
}
        
        // =================================================
// HORMIGÓN
// =================================================

if (rubro.calculadora === "hormigon") {

    if (!rubro.datos) {
        rubro.datos = {};
    }

    const moduloSeleccionado =
        baseCalculos.find(
            modulo => modulo.id === "hormigon_armado"
        );

    if (!rubro.moduloCalculo) {
        rubro.moduloCalculo = "hormigon_armado";
    }

    const volumen =
        parseFloat(
            String(rubro.datos.volumen).replace(",", ".")
        );

    // ---------------------------------------------
    // SUMAR AL ACUMULADO
    // ---------------------------------------------

    if (
        moduloSeleccionado &&
        !isNaN(volumen) &&
        volumen > 0
    ) {

        moduloSeleccionado.materiales.forEach(material => {

            if (material.unidad === "manual") return;

            const cantidad =
                material.cantidadPorUnidad * volumen;

            if (!acumuladoMateriales[material.nombre]) {

                acumuladoMateriales[material.nombre] = {
                    cantidad: 0,
                    unidad: material.unidad
                };

            }

            acumuladoMateriales[material.nombre].cantidad += cantidad;

        });
    }

    // ---------------------------------------------
    // MOSTRAR HORMIGÓN
    // ---------------------------------------------

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
                    Volumen
                </label>

                <div style="
                    display:flex;
                    align-items:center;
                    gap:10px;
                    margin-top:8px;
                ">

                    <input
                        type="text"
                        class="volumenDetalle"
                        data-rubro-id="${rubro.id}"
                        value="${
                            rubro.datos.volumen || ""
                        }"
                        placeholder="0,00"
                    >

                    <span>
                        m³
                    </span>

                </div>

                <div style="margin-top:25px">

                    <h3>
                        Materiales necesarios
                    </h3>

                    ${
                        moduloSeleccionado &&
                        !isNaN(volumen) &&
                        volumen > 0

                            ?

                        moduloSeleccionado.materiales
                            .filter(material =>
                                material.unidad !== "manual"
                            )
                            .map(material => {

                                const cantidad =
                                    material.cantidadPorUnidad *
                                    volumen;

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
                                            ${cantidad.toFixed(2)}
                                            ${material.unidad}
                                        </span>

                                    </div>
                                `;
                            })
                            .join("")

                            :

                        `<p style="
                            color:#95a5a6;
                            margin-top:15px;
                        ">
                            Ingresá un volumen para calcular.
                        </p>`
                    }

                </div>

            </div>

        </div>
    `;

    return;
}
        
        // =================================================
        // OTROS RUBROS
        // =================================================

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

    });


    // =====================================================
    // ACUMULADO GENERAL
    // =====================================================

    const materiales =
        Object.entries(acumuladoMateriales);

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
                    sector.rubros.find(
                        r => r.id === rubroId
                    );

                if (!rubro) return;

                rubro.moduloCalculo =
                    selector.value || null;

                rubro.datos =
                    rubro.datos || {};

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
                sector.rubros.find(
                    r => r.id === rubroId
                );

            if (!rubro) return;

            rubro.datos =
                rubro.datos || {};

            rubro.datos.superficie =
                input.value;

            guardarObra();

            const posicionCursor = input.selectionStart;

            renderDetalle();

            const nuevoInput =
                document.querySelector(
                    `.superficieDetalle[data-rubro-id="${rubroId}"]`
                );

            if (nuevoInput) {

                nuevoInput.focus();

                nuevoInput.setSelectionRange(
                    posicionCursor,
                    posicionCursor
                );

            }

        });

    });


    // =====================================================
    // EVENTOS DE VOLUMEN
    // =====================================================

    document
        .querySelectorAll(".volumenDetalle")
        .forEach(input => {

            input.addEventListener("input", () => {

                const rubroId =
                    Number(input.dataset.rubroId);

                const rubro =
                    sector.rubros.find(
                        r => r.id === rubroId
                    );

                if (!rubro) return;

                rubro.datos =
                    rubro.datos || {};

                rubro.datos.volumen =
                    input.value;

                guardarObra();

                const posicionCursor =
                    input.selectionStart;

                renderDetalle();

                const nuevoInput =
                    document.querySelector(
                        `.volumenDetalle[data-rubro-id="${rubroId}"]`
                    );

                if (nuevoInput) {

                    nuevoInput.focus();

                    nuevoInput.setSelectionRange(
                        posicionCursor,
                        posicionCursor
                    );

                }

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
