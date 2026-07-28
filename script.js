
const historial=[];
function render(){
 let html='',L=0,C=0,CA=0,A=0;
 historial.forEach((i,n)=>{
   L+=i.l;C+=i.c;CA+=i.ca;A+=i.a;
   html+=`<div class="item"><b>Mampostería ${n+1}</b><br>${i.area.toFixed(2)} m²<br><button onclick="eliminar(${n})">Eliminar</button></div>`;
 });
 document.getElementById('lista').innerHTML=html||'Sin cálculos';
 document.getElementById('totales').innerHTML=
 `Ladrillos: ${L}<br>Cemento: ${C.toFixed(1)} kg<br>Cal: ${CA.toFixed(1)} kg<br>Arena: ${A.toFixed(3)} m³`;
}
function calcular(){
 const largo=parseFloat(document.getElementById('largo').value);
 const alto=parseFloat(document.getElementById('alto').value);
 if(isNaN(largo)||isNaN(alto)){alert('Complete los datos');return;}
 const area=largo*alto;
 const d={area:area,l:Math.ceil(area*60),c:area*7.5,ca:area*7.3,a:area*0.035};
 historial.push(d);
 document.getElementById('resultado').innerHTML=
 `<p><b>Área:</b> ${area.toFixed(2)} m²</p>
 <p><b>Ladrillos:</b> ${d.l}</p>
 <p><b>Cemento:</b> ${d.c.toFixed(1)} kg</p>
 <p><b>Cal:</b> ${d.ca.toFixed(1)} kg</p>
 <p><b>Arena:</b> ${d.a.toFixed(3)} m³</p>`;
 render();
}
function eliminar(i){historial.splice(i,1);render();}
render();
