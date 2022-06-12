//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let   articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    //When you add a course by pressing "Add to Cart"
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminates courses from the cart
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //we reset the array

        limpiarHTML();
    })
}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
 }
}

//Eliminates courses from the cart
function eliminarCurso(e){
    
    if (e.target.classList.contains('borrar-curso')) {

       const cursoId = e.target.getAttribute('data-id');

       //Eliminates from the array the articles for id number
       articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId );
       console.log(articulosCarrito);

       carritoHTML(); //Iterates on the cart and shows its HTML
    }
}

//Read the HTML content we clicked on and extract the information.
function leerDatosCurso(curso){
    //Create and object with the selected course.
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //checks if the element exists in the cart;
    const existe = articulosCarrito.some(curso => curso.id=== infoCurso.id);
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;// returns the object updated
            }else{
                return curso; //returns the objects that are not duplicated
            }
        });
        articulosCarrito =[...cursos];
    } else {
        //Adds elements to the cart array
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Adds elements to the cart.
    console.log(infoCurso);

    carritoHTML();
}

function carritoHTML(){

    //Clean up the cart
    limpiarHTML();

    //walk the cart and generates the HTML
    articulosCarrito.forEach(curso =>{

        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen} " width="100">
        </td>
        <td>  ${titulo} <td>
        <td>  ${precio}  </td>
        <td>  ${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;
        //Adds the HTML from the cart to the tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){

   while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
   }
}