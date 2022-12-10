// Variables
 const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector("#lista-carrito tbody"); // se separan dos elementos por espacio 
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
 const listaCursos = document.querySelector('#lista-cursos');
 let articulosCarrito = [];

cargarEventListeners();
 function cargarEventListeners(){
    // Cuando agregas un curso pulsando agregar al carrito 
listaCursos.addEventListener('click', agregarCurso)
// Eliminar elementos del carrito
carrito.addEventListener('click', eliminarCurso)
// Vaciar el carrito
vaciarCarritoBtn.addEventListener('click', ()=>{
    articulosCarrito = []; // reseteamos el arreglo

    limpiarHTML(); // Limpiamos todo el HTML
})


// Funciones
function agregarCurso(e){
e.preventDefault();

if (e.target.classList.contains("agregar-carrito")){
const cursoSeleccionado = e.target.parentElement.parentElement;
leerDatosCurso(cursoSeleccionado);
}
}

 }
// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        let pos = -1
        articulosCarrito.forEach((curso,currentPos) => {
            if(curso.id === cursoId){
                //pos = currentPos
                if(curso.cantidad >1){
                    curso.cantidad--
                }else{
                    pos = currentPos
                }
            }
        })

        if(pos>=0){
            articulosCarrito.splice(pos,1)
       
        }
// Elimina del arreglo articulosCarrito por el data-id 
//articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
carritoHTML(); // Volvemos a iterar sobre el carrito y mostrar su HTML


    }

}

 // Lee el contenido del HTML que le dimos click y extrae la información del curso 
function leerDatosCurso(curso){
//console.log(curso);


// Crear un objeto con el contenido del curso actual
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}
// Revisa si un elemto exixte en el carrito 
const existe = articulosCarrito.some(curso=> curso.id === infoCurso.id);
if (existe){
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map(curso=> {
    if(curso.id === infoCurso.id){
       curso.cantidad++;
        return curso; // retorna el objeto actualizado
    }else {
        return curso; // retorna los objetos que no son el duplicado
    }
});
articulosCarrito = [...cursos];

} else {
// Agregar elemtos al arreglo del carrito
articulosCarrito = [...articulosCarrito, infoCurso];
}



console.log(articulosCarrito);
carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML(){
// Limpiar el HTML
limpiarHTML();

// Recorre el carrito y genera el HTML
articulosCarrito.forEach(curso =>{
    const row = document.createElement('tr');
    row.innerHTML =`
      <td>
      <img src = "${curso.imagen}" width="100">
      </td>
    <td>${curso.titulo} </td>
    <td>${curso.precio} </td>
    <td>${curso.cantidad} </td>
    <td>
      <a href ="#" class="borrar-curso" data-id="${curso.id}" > X </a> 
    </td>
    `;

    // Agregar el HTML al carrito en el tbody
    contenedorCarrito.appendChild(row); 
})

}
// Elimina los cursos del tbody
function limpiarHTML(){
   // contenedorCarrito.innerHTML = '';
    // forma mas rapida de limpiar el HTML
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}

