// =====================================================
// CALCULOBRA | TECTONICO
// script.js - Versión 0.3
// =====================================================

const obra = { sectores: [] };

let sectorSeleccionadoId = null;
let rubroSeleccionadoId = null;

const contSectores = document.getElementById("sectores");
const contRubros = document.getElementById("rubros");
const contDetalle = document.getElementById("detalle");

document.getElementById("nuevoSector").addEventListener("click", crearSector);
document.getElementById("agregarRubro").addEventListener("click", agregarRubro);

function obtenerSector(id){
    return obra.sectores.find(s => s.id === id);
}

function obtenerRubro(){
    const s = obtenerSector(sectorSeleccionadoId);
    return s ? s.rubros.find(r => r.id === rubroSeleccionadoId) : null;
}

function crearSector(){
    const nombre = prompt("Nombre del sector:");
    if(!nombre) return;

    obra.sectores.push({
        id: Date.now(),
        nombre: nombre.trim(),
        rubros:[]
    });

    renderSectores();
}

function agregarRubro(){

    if(sectorSeleccionadoId===null){
        alert("Primero seleccione un sector.");
        return;
    }

    const tipo=prompt("Nombre del rubro:");
    if(!tipo) return;

    const descripcion=prompt("Descripción (opcional):") || "";

    obtenerSector(sectorSeleccionadoId).rubros.push({
        id:Date.now(),
        tipo,
        descripcion,
        datos:{}
    });

    renderRubros();

}

function renderSectores(){

    if(obra.sectores.length===0){
        contSectores.innerHTML='<p class="mensaje-vacio">No hay sectores.</p>';
        return;
    }

    contSectores.innerHTML="";

    obra.sectores.forEach(sector=>{

        const div=document.createElement("div");
        div.className="item-sector"+(sector.id===sectorSeleccionadoId?" activo":"");
        div.textContent=sector.nombre;

        div.onclick=()=>{
            sectorSeleccionadoId=sector.id;
            rubroSeleccionadoId=null;
            renderSectores();
            renderRubros();
            renderDetalle();
        };

        contSectores.appendChild(div);

    });

}

function renderRubros(){

    const sector=obtenerSector(sectorSeleccionadoId);

    if(!sector){
        contRubros.innerHTML='<p class="mensaje-vacio">Seleccione un sector.</p>';
        return;
    }

    if(sector.rubros.length===0){
        contRubros.innerHTML='<p class="mensaje-vacio">Todavía no hay rubros.</p>';
        return;
    }

    contRubros.innerHTML="";

    sector.rubros.forEach(r=>{

        const div=document.createElement("div");
        div.className="item-rubro"+(r.id===rubroSeleccionadoId?" activo":"");

        div.innerHTML="<div class='titulo'>🧱 "+r.tipo+"</div>"+(r.descripcion?"<div class='desc'>("+r.descripcion+")</div>":"");

        div.onclick=()=>{
            rubroSeleccionadoId=r.id;
            renderRubros();
            renderDetalle();
        };

        contRubros.appendChild(div);

    });

}

function renderDetalle(){

    const rubro=obtenerRubro();

    if(!rubro){
        contDetalle.innerHTML='<p class="mensaje-vacio">Seleccione un rubro para comenzar.</p>';
        return;
    }

    contDetalle.innerHTML=`
    <h3>${rubro.tipo}</h3>
    <p><strong>Descripción:</strong> ${rubro.descripcion || "Sin descripción"}</p>
    <hr style="margin:20px 0">
    <p>En este panel aparecerá el formulario específico del rubro.</p>
    <pre>${JSON.stringify(rubro.datos,null,2)}</pre>`;
}

renderSectores();
renderRubros();
renderDetalle();
