// =====================================================
// CALCULOBRA | TECTONICO
// script.js - Versión 1.1
// =====================================================

// =====================================================
// SISTEMA DE OBRAS
// =====================================================

let obras = JSON.parse(localStorage.getItem("calculobra_obras"));

if (!obras) {

    const obraActual =
        JSON.parse(localStorage.getItem("calculobra"));

    if (obraActual) {

        obras = [{
            id: generarId(),
            nombre: obraActual.nombre || "Sin nombre",
            sectores: obraActual.sectores || []
        }];

    } else {

        obras = [{
            id: generarId(),
            nombre: "Sin nombre",
            sectores: []
        }];

    }

    localStorage.setItem(
        "calculobra_obras",
        JSON.stringify(obras)
    );
}

let obraSeleccionadaId = obras[0].id;

let obra = obras.find(
    o => o.id === obraSeleccionadaId
);

let sectorSeleccionadoId =
    obra.sectores.length > 0
        ? obra.sectores[0].id
        : null;

let rubroSeleccionadoId = null;

const contSectores = document.getElementById("sectores");
const contRubros = document.getElementById("rubros");
const contDetalle = document.getElementById("detalle");
const nombreObra = document.getElementById("nombreObra");
nombreObra.onclick = () => {

    const nuevoNombre = prompt(
        "Nombre de la obra:",
        obra.nombre || ""
    );

    if (nuevoNombre === null) return;

    obra.nombre = nuevoNombre.trim() || "Sin nombre";

    guardarObra();

    nombreObra.textContent = obra.nombre;
};

const modal = document.getElementById("modalCatalogo");
const listaCatalogo = document.getElementById("listaCatalogo");
const buscarRubro = document.getElementById("buscarRubro");

document.getElementById("nuevoSector").addEventListener("click", crearSector);
document.getElementById("nuevaObra").addEventListener("click", crearObra);
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
    localStorage.setItem(
        "calculobra_obras",
        JSON.stringify(obras)
    );
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
 r.categoria === "cimientos" ? "cimientos" :
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

function renderObras() {

    const contObras = document.getElementById("obras");

    contObras.innerHTML = "";

    obras.forEach(o => {

        const div = document.createElement("div");

        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.justifyContent = "space-between";
        div.style.padding = "12px";
        div.style.cursor = "pointer";
        div.style.borderRadius = "8px";
        div.style.marginBottom = "6px";

        if (o.id === obraSeleccionadaId) {
            div.style.background = "#eef5ff";
            div.style.fontWeight = "600";
        }

// NOMBRE DE LA OBRA
const nombre = document.createElement("span");

nombre.textContent = o.nombre || "Sin nombre";

// ESTADO DE LA OBRA
const estado = document.createElement("button");

estado.textContent = o.estado || "En curso";
estado.title = "Cambiar estado de la obra";

estado.style.border = "none";
estado.style.borderRadius = "8px";
estado.style.padding = "5px 10px";
estado.style.cursor = "pointer";
estado.style.fontSize = "12px";
estado.style.fontWeight = "600";
estado.style.marginLeft = "8px";

if (o.estado === "Pendiente") {
    estado.style.background = "#fff0c2";
    estado.style.color = "#9a6700";
}

else if (o.estado === "Detenida") {
    estado.style.background = "#ffd6d9";
    estado.style.color = "#b42318";
}

else {
    estado.style.background = "#d1fae5";
    estado.style.color = "#087443";
}
        
estado.onclick = (e) => {

    e.stopPropagation();

    const nuevoEstado = prompt(
        "Estado de la obra:\n\n1 - 🟢 En curso\n2 - 🟡 Pendiente\n3 - 🔴 Detenida",
        o.estado || "En curso"
    );

    if (nuevoEstado === null) return;

    if (
        nuevoEstado !== "En curso" &&
        nuevoEstado !== "Pendiente" &&
        nuevoEstado !== "Detenida"
    ) {
        alert("Escribí exactamente: En curso, Pendiente o Detenida.");
        return;
    }

    o.estado = nuevoEstado;

    guardarObra();

    renderObras();
};

        // BOTÓN EDITAR
        const editar = document.createElement("button");

        editar.textContent = "✎";
        editar.title = "Editar nombre de la obra";

        editar.style.border = "none";
        editar.style.background = "transparent";
        editar.style.cursor = "pointer";
        editar.style.fontSize = "18px";

        editar.onclick = (e) => {

            e.stopPropagation();

            const nuevoNombre = prompt(
                "Nombre de la obra:",
                o.nombre || ""
            );

            if (nuevoNombre === null) return;

            const nombreLimpio = nuevoNombre.trim();

            if (!nombreLimpio) return;

            o.nombre = nombreLimpio;

            guardarObra();

            // Si estamos editando la obra seleccionada,
            // actualizar también el nombre de arriba.
            if (o.id === obraSeleccionadaId) {
                nombreObra.textContent = o.nombre;
            }

            renderObras();
        };

div.appendChild(nombre);

          // BOTÓN DATOS DE LA OBRA
        const datosObra = document.createElement("button");

        datosObra.textContent = "⚙";
        datosObra.title = "Editar datos de la obra";

        datosObra.style.border = "none";
        datosObra.style.background = "transparent";
        datosObra.style.cursor = "pointer";
        datosObra.style.fontSize = "17px";

        datosObra.onclick = (e) => {

            e.stopPropagation();

            const propietario = prompt(
                "Propietario / cliente:",
                o.propietario || ""
            );

            if (propietario === null) return;

            const contacto = prompt(
                "Contacto del propietario:",
                o.contactoPropietario || ""
            );

            if (contacto === null) return;

            const fecha = prompt(
                "Fecha de entrega:",
                o.fechaEntrega || ""
            );

            if (fecha === null) return;

            o.propietario = propietario.trim();
            o.contactoPropietario = contacto.trim();
            o.fechaEntrega = fecha.trim();

            guardarObra();

            renderObras();
        };

        
div.appendChild(estado);
div.appendChild(datosObra);
div.appendChild(editar);

      
        // SELECCIONAR OBRA
        div.onclick = () => {

            obraSeleccionadaId = o.id;

            obra = obras.find(
                obraItem => obraItem.id === obraSeleccionadaId
            );

            sectorSeleccionadoId =
                obra.sectores.length > 0
                    ? obra.sectores[0].id
                    : null;

            rubroSeleccionadoId = null;

            nombreObra.textContent =
                obra.nombre || "Sin nombre";

            renderObras();
            renderSectores();
            renderRubros();
            renderDetalle();
        };

        contObras.appendChild(div);

    });
}

function crearObra() {

    const nombre = prompt("Nombre de la nueva obra:");

    if (nombre === null) return;

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) return;

const nuevaObra = {
    id: generarId(),
    nombre: nombreLimpio,
    estado: "En curso",
    propietario: "",
    contactoPropietario: "",
    fechaEntrega: "",
    sectores: []
};

    obras.push(nuevaObra);

    obraSeleccionadaId = nuevaObra.id;
    obra = nuevaObra;

    sectorSeleccionadoId = null;
    rubroSeleccionadoId = null;

    guardarObra();

    nombreObra.textContent = obra.nombre;

    renderObras();
    renderSectores();
    renderRubros();
    renderDetalle();
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
                unidad: material.unidad
            };
        }

        acumuladoMateriales[material.nombre].cantidad += cantidad;
    });

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
                Tipo de mortero para pisos
            </label>

            <select
                class="selectorModuloDetalle"
                data-rubro-id="${rubro.id}"
            >

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
                            Seleccioná el tipo de mortero para comenzar.
                        </p>
                    `
            }

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
// CIMIENTOS
// =================================================

if (rubro.calculadora === "cimientos") {

    if (!rubro.datos) {
        rubro.datos = {};
    }

    const modulos = baseCalculos.filter(
        modulo => modulo.categoria === "cimientos"
    );

    const moduloSeleccionado =
        modulos.find(
            modulo => modulo.id === rubro.moduloCalculo
        );

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
    // MOSTRAR CIMIENTOS
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
                    Tipo de cimiento
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

                            </div>

                            <div style="margin-top:25px">

                                <h3>
                                    Materiales necesarios
                                </h3>

                                ${
                                    !isNaN(volumen) &&
                                    volumen > 0

                                        ?

                                    moduloSeleccionado.materiales.map(
                                        material => {

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
                                        }
                                    ).join("")

                                        :

                                    `<p style="
                                        color:#95a5a6;
                                        margin-top:15px;
                                    ">
                                        Ingresá un volumen para calcular.
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
                                Seleccioná el tipo de cimiento para comenzar.
                            </p>
                        `
                }

            </div>

        </div>
    `;

    return;
}

// =================================================
// CONTRAPISOS
// =================================================

if (rubro.calculadora === "contrapiso") {

    if (!rubro.datos) {
        rubro.datos = {};
    }

    const modulos = baseCalculos.filter(
        modulo => modulo.categoria === "contrapisos"
    );

    const moduloSeleccionado =
        modulos.find(
            modulo => modulo.id === rubro.moduloCalculo
        );

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
    // MOSTRAR CONTRAPISO
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
                    Tipo de contrapiso
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

                            </div>

                            <div style="margin-top:25px">

                                <h3>
                                    Materiales necesarios
                                </h3>

                                ${
                                    !isNaN(volumen) &&
                                    volumen > 0

                                        ?

                                    moduloSeleccionado.materiales.map(
                                        material => {

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
                                        }
                                    ).join("")

                                        :

                                    `<p style="
                                        color:#95a5a6;
                                        margin-top:15px;
                                    ">
                                        Ingresá un volumen para calcular.
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
                                Seleccioná el tipo de contrapiso para comenzar.
                            </p>
                        `
                }

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
renderObras();

// =====================================================
// EXPORTAR RESUMEN DE OBRA A PDF
// =====================================================

document.getElementById("exportarPDF").onclick = exportarPDF;

function generarEncabezadoPDF(obra) {
    return `
        <div class="membrete">

<div class="tectonico">
    <img src="Logo estudio tectonico.jpg" alt="TECTONICO">
</div>

            <div class="contacto">
                Contacto: 3464 560200<br>
                Correo: estebangonzalezlaugas@gmail.com<br>
                Redes: @estudio.tectonico (Instagram)
            </div>

        </div>

        <div class="titulo-informe">
            Presupuesto de materiales según etapas de obra
        </div>

        <div class="datos-obra">

            <div class="nombre">
                ${obra.nombre || "Sin nombre"}
            </div>

            <div class="dato">
                <strong>Propietario / cliente:</strong>
                ${obra.propietario || "—"}
            </div>

            <div class="dato">
                <strong>Contacto:</strong>
                ${obra.contactoPropietario || "—"}
            </div>

            <div class="dato">
                <strong>Estado de la obra:</strong>
                ${obra.estado || "En curso"}
            </div>

            <div class="dato">
                <strong>Fecha de entrega:</strong>
                ${obra.fechaEntrega || "—"}
            </div>

        </div>
    `;
}

function exportarPDF() {

    let html = `
        <html>
        <head>
            <title>${obra.nombre || "Obra"}</title>

            <style>

                          body {
                    font-family: Arial, Helvetica, sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #222;
                    background: white;
                }

                .membrete {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding-bottom: 18px;
                    margin-bottom: 25px;
                    border-bottom: 1px solid #222;
                }

.tectonico img {
    width: 190px;
    height: auto;
    display: block;
}

                .contacto {
                    text-align: right;
                    font-size: 10px;
                    line-height: 1.5;
                }

                .titulo-informe {
                    font-size: 20px;
                    font-weight: bold;
                    margin: 25px 0 20px 0;
                }

                .datos-obra {
                    border: 1px solid #ccc;
                    padding: 15px;
                    margin-bottom: 30px;
                }

                .datos-obra .nombre {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 12px;
                }

                .datos-obra .dato {
                    font-size: 11px;
                    margin: 5px 0;
                }

                h1 {
                    margin-bottom: 5px;
                }

                h2 {
                    margin-top: 30px;
                    margin-bottom: 15px;
                    padding-bottom: 7px;
                    border-bottom: 2px solid #222;
                    font-size: 17px;
                }

                h3 {
                    margin-top: 18px;
                    margin-bottom: 8px;
                    font-size: 14px;
                }

                .estado {
                    margin-bottom: 25px;
                }

                .rubro {
                    margin-bottom: 20px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #ddd;
                }

                .material {
                    display: flex;
                    justify-content: space-between;
                    padding: 5px 0;
                    font-size: 11px;
                }

                .acumulado {
                    margin-top: 35px;
                    border-top: 2px solid #222;
                    padding-top: 15px;
                }

                @media print {
                    body {
                        margin: 20mm;
                    }

                    .membrete,
                    .datos-obra,
                    .rubro,
                    .acumulado {
                        break-inside: avoid;
                    }
                }     
               
               {
                    body {
                        margin: 20px;
                    }
                }

            </style>

        </head>

        <body>

    ${generarEncabezadoPDF(obra)}
`;
    
    // =====================================================
    // SECTORES Y RUBROS
    // =====================================================

    obra.sectores.forEach(sector => {

        html += `
            <h2>${sector.nombre}</h2>
        `;

        sector.rubros.forEach(rubro => {

            html += `
                <div class="rubro">

                    <h3>${rubro.tipo}</h3>
            `;

            if (rubro.descripcion) {

                html += `
                    <p>${rubro.descripcion}</p>
                `;
            }

            let cantidadBase = null;
            let unidadBase = "";

            if (
                rubro.datos &&
                rubro.datos.superficie !== undefined
            ) {

                cantidadBase = parseFloat(
                    String(rubro.datos.superficie).replace(",", ".")
                );

                unidadBase = "m²";
            }

            else if (
                rubro.datos &&
                rubro.datos.volumen !== undefined
            ) {

                cantidadBase = parseFloat(
                    String(rubro.datos.volumen).replace(",", ".")
                );

                unidadBase = "m³";
            }

            if (
                cantidadBase &&
                cantidadBase > 0
            ) {

                html += `
                    <p>
                        Cantidad: ${cantidadBase} ${unidadBase}
                    </p>
                `;

            } else {

                html += `
                    <p>
                        Sin cantidad cargada.
                    </p>
                `;
            }

            // =============================================
            // MATERIALES DEL RUBRO
            // =============================================

            let modulos = [];

            if (rubro.calculadora === "mamposteria") {

                modulos = baseCalculos.filter(
                    modulo => modulo.categoria === "mamposterias"
                );

            }

            else if (
                rubro.calculadora === "revoque_grueso" ||
                rubro.calculadora === "revoque_fino" ||
                rubro.calculadora === "azotado_hidrofugo"
            ) {

                modulos = baseCalculos.filter(
                    modulo =>
                        modulo.categoria === "revoques" &&
                        modulo.tipoRevoque === rubro.calculadora
                );

            }

            else if (rubro.calculadora === "carpeta") {

                modulos = baseCalculos.filter(
                    modulo => modulo.categoria === "carpetas"
                );

            }

            else if (rubro.calculadora === "mortero_pisos") {

                modulos = baseCalculos.filter(
                    modulo => modulo.categoria === "morteros_pisos"
                );

            }

            else if (rubro.calculadora === "cimientos") {

                modulos = baseCalculos.filter(
                    modulo => modulo.categoria === "cimientos"
                );

            }

            else if (rubro.calculadora === "contrapiso") {

                modulos = baseCalculos.filter(
                    modulo => modulo.categoria === "contrapisos"
                );

            }

            else if (rubro.calculadora === "hormigon") {

                modulos = baseCalculos.filter(
                    modulo => modulo.id === "hormigon_armado"
                );

            }

            const modulo = modulos.find(
                modulo => modulo.id === rubro.moduloCalculo
            ) || modulos[0];

            if (
                modulo &&
                cantidadBase &&
                cantidadBase > 0
            ) {

                html += `
                    <strong>Materiales:</strong>
                `;

                modulo.materiales.forEach(material => {

                    if (material.unidad === "manual") return;

                    const cantidad =
                        material.cantidadPorUnidad *
                        cantidadBase;

                    html += `
                        <div class="material">

                            <span>
                                ${material.nombre}
                            </span>

                            <span>
                                ${cantidad.toFixed(2)}
                                ${material.unidad}
                            </span>

                        </div>
                    `;
                });
            }

            html += `
                </div>
            `;

        });

    });

    // =====================================================
    // ACUMULADO GENERAL
    // =====================================================

    const acumulado = {};

    obra.sectores.forEach(sector => {

        sector.rubros.forEach(rubro => {

            let cantidadBase = null;
            let modulos = [];

            if (
                rubro.datos &&
                rubro.datos.superficie !== undefined
            ) {

                cantidadBase = parseFloat(
                    String(rubro.datos.superficie).replace(",", ".")
                );

            }

            else if (
                rubro.datos &&
                rubro.datos.volumen !== undefined
            ) {

                cantidadBase = parseFloat(
                    String(rubro.datos.volumen).replace(",", ".")
                );
            }

            if (!cantidadBase || cantidadBase <= 0) return;

            if (rubro.calculadora === "mamposteria") {

                modulos = baseCalculos.filter(
                    modulo => modulo.categoria === "mamposterias"
                );

            }

            else if (
                rubro.calculadora === "revoque_grueso" ||
                rubro.calculadora === "revoque_fino" ||
                rubro.calculadora === "azotado_hidrofugo"
            ) {

                modulos = baseCalculos.filter(
                    modulo =>
                        modulo.categoria === "revoques" &&
                        modulo.tipoRevoque === rubro.calculadora
                );

            }

            else if (rubro.calculadora === "carpeta") {

                modulos = baseCalculos.filter(
                    modulo => modulo.categoria === "carpetas"
                );

            }

            else if (rubro.calculadora === "mortero_pisos") {

                modulos = baseCalculos.filter(
                    modulo => modulo.categoria === "morteros_pisos"
                );

            }

            else if (rubro.calculadora === "cimientos") {

                modulos = baseCalculos.filter(
                    modulo => modulo.categoria === "cimientos"
                );

            }

            else if (rubro.calculadora === "contrapiso") {

                modulos = baseCalculos.filter(
                    modulo => modulo.categoria === "contrapisos"
                );

            }

            else if (rubro.calculadora === "hormigon") {

                modulos = baseCalculos.filter(
                    modulo => modulo.id === "hormigon_armado"
                );
            }

            const modulo = modulos.find(
                modulo => modulo.id === rubro.moduloCalculo
            ) || modulos[0];

            if (!modulo) return;

            modulo.materiales.forEach(material => {

                if (material.unidad === "manual") return;

                const cantidad =
                    material.cantidadPorUnidad *
                    cantidadBase;

                if (!acumulado[material.nombre]) {

                    acumulado[material.nombre] = {
                        cantidad: 0,
                        unidad: material.unidad
                    };
                }

                acumulado[material.nombre].cantidad += cantidad;

            });

        });

    });

    html += `
        <div class="acumulado">

            <h2>ACUMULADO DE MATERIALES</h2>
    `;

    Object.entries(acumulado).forEach(
        ([nombre, datos]) => {

            html += `
                <div class="material">

                    <strong>
                        ${nombre}
                    </strong>

                    <span>
                        ${datos.cantidad.toFixed(2)}
                        ${datos.unidad}
                    </span>

                </div>
            `;
        }
    );

    html += `
        </div>

        </body>
        </html>
    `;

    const ventana = window.open(
        "",
        "_blank"
    );

    ventana.document.write(html);
    ventana.document.close();

    ventana.focus();

    setTimeout(() => {

        ventana.print();

    }, 500);
}
