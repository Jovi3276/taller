const carrito = document.querySelector("#carrito");
const listaRepuestos = document.querySelector("#lista-repuestos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];
cargarEventosListeners();

function cargarEventosListeners() {
  listaRepuestos.addEventListener("click", agregarRepuesto);

  // eliminar
  carrito.addEventListener("click", eliminarRepuesto);

  vaciarCarrito.addEventListener("click", () => {
    articulosCarrito = []; // Resetea el array
    carritoHTML(); // Limpia el HTML
  });  


}

function eliminarRepuesto(e) {
  console.log(e.target);

  if (e.target.classList.contains("borrar-repuesto")) {
    // console.log("eliminando");
    console.log(e.target.getAttribute("data-id"));

    const repuestoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((repuesto) => repuesto.id !== repuestoId);
    console.log(articulosCarrito);

    carritoHTML();
  }
}

function agregarRepuesto(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const repuestoSeleccionado = e.target.parentElement.parentElement;
    leerDatosRepuesto(repuestoSeleccionado); //16
  }
}

function leerDatosRepuesto(repuestoSeleccionado) {
  console.log(repuestoSeleccionado);

  const infoRepuesto = {
    imagen: repuestoSeleccionado.querySelector("img").src,
    titulo: repuestoSeleccionado.querySelector("h4").textContent,
    precio: repuestoSeleccionado.querySelector(".precio span").textContent,
    id: repuestoSeleccionado.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((repuesto) => repuesto.id === infoRepuesto.id);
  // console.log(existe);

  if (existe) {
    // actualizamos la cantidad
    const repuesto = articulosCarrito.map((repuesto) => {
      if (repuesto.id === infoRepuesto.id) {
        repuesto.cantidad++;
        return repuesto;
      } else {
        return repuesto;
      }
    });
    articulosCarrito = [...repuesto];
  } else {
    articulosCarrito = [...articulosCarrito, infoRepuesto];
  }

  console.log(infoRepuesto);

  console.log(articulosCarrito);

  carritoHTML();
}

function carritoHTML() {
  limpiarHTML();

  articulosCarrito.forEach((repuesto) => {
    const { imagen, titulo, precio, cantidad, id } = repuesto;
    const row = document.createElement("tr"); //table row
    row.innerHTML = ` 
    <td><img src="${imagen}" width="100"></td>
    <td>  ${titulo} </td>
    <td> ${precio} </td>
    <td> ${cantidad} </td>
    <td> <a href="#" class="borrar-repuesto" data-id="${id}">Borrar</a> </td>
    `;
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
}
