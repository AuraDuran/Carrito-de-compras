
const agregarBotones = document.querySelectorAll(".agregar");

let carritoProductos = [];
function agregarAlCarrito(nombre, precio) {
    precio = parseFloat(precio.replace("$", "").trim());
    const index = carritoProductos.findIndex(producto => producto.nombre === nombre);
    if (index !== -1) {
        carritoProductos[index].cantidad++;
    } else {
        carritoProductos.push({ nombre, precio, cantidad: 1 });
    }
    alert("Producto agregado al carrito");
    actualizarCarritoMenu();
}


function eliminarProducto(index) {
    carritoProductos.splice(index, 1);
    actualizarCarritoMenu(); 
}

function actualizarCarritoMenu() {
    const carritoMenu = document.querySelector('.carritoMenu');
    carritoMenu.innerHTML = ''; 
    if (carritoProductos.length === 0) {
        carritoMenu.textContent = 'El carrito está vacío';
        
    } else {
        let totalCompra = 0;
        for (const [index, producto] of carritoProductos.entries()) {
            const productoElemento = document.createElement('div');
            const cantidadProducto = document.createElement('span');
            cantidadProducto.textContent = producto.cantidad;
            const botonIncrementar = document.createElement('button');
            botonIncrementar.textContent = ' + ';
            botonIncrementar.addEventListener('click', () => {
                carritoProductos[index].cantidad++;
                actualizarCarritoMenu();
            });
            const botonDecrementar = document.createElement('button');
            botonDecrementar.textContent = ' - ';
            botonDecrementar.addEventListener('click', () => {
                if (carritoProductos[index].cantidad > 1) {
                    carritoProductos[index].cantidad--;
                    actualizarCarritoMenu();
                }
            });
            const eliminarBoton = document.createElement('button');
            eliminarBoton.textContent = ' X ';
            eliminarBoton.addEventListener('click', () => eliminarProducto(index));
           
            productoElemento.textContent = `${producto.nombre} - Precio: $${producto.precio} - Cantidad: `;
            productoElemento.appendChild(cantidadProducto);
            productoElemento.appendChild(botonIncrementar);
            productoElemento.appendChild(botonDecrementar);
            productoElemento.appendChild(eliminarBoton);
            carritoMenu.appendChild(productoElemento);
            totalCompra += producto.precio * producto.cantidad;
        }

        const totalCompraElemento = document.createElement('div');
        totalCompraElemento.textContent = `Total de la compra: $${totalCompra}`;
        carritoMenu.appendChild(totalCompraElemento);

        const realizarCompraBoton = document.createElement('button');
        realizarCompraBoton.textContent = 'Realizar compra';
        realizarCompraBoton.addEventListener('click', realizarCompra);
        carritoMenu.appendChild(realizarCompraBoton);

        const limpiarCarritoBoton = document.createElement('button');
        limpiarCarritoBoton.textContent = 'Limpiar Carrito';
        limpiarCarritoBoton.addEventListener('click', limpiarCarrito);
        carritoMenu.appendChild(limpiarCarritoBoton);
    }
}


function limpiarCarrito() {
    carritoProductos = []; 
    actualizarCarritoMenu();
}


function agregarAlCarrito(nombre, precio) {
    precio = parseFloat(precio.replace("$", "").trim());
    const index = carritoProductos.findIndex(producto => producto.nombre === nombre);
    if (index !== -1) {
        carritoProductos[index].cantidad++;
    } else {
        carritoProductos.push({ nombre, precio, cantidad: 1 });
    }
    alert("Producto agregado al carrito");
    actualizarCarritoMenu();
}


function calcularTotalCompra() {
    let total = 0;
    for (const producto of carritoProductos) {
        total += producto.precio * producto.cantidad; 
    }
    return total;
}


function realizarCompra() {
    const totalCompra = calcularTotalCompra();
    alert(`El total de su compra es de: $${totalCompra}`);
    alert(`Compra realizada :)`);
    
    carritoProductos = [];
    actualizarCarritoMenu();
}


for (const boton of agregarBotones) {
    boton.addEventListener('click', () => {
        const nombreProducto = boton.parentNode.querySelector('h2').textContent;
        
        const precioProducto = boton.parentNode.querySelector('p').textContent.match(/\d+/)[0];
        agregarAlCarrito(nombreProducto, precioProducto);
    });
}


document.querySelector("#iconoCarrito").addEventListener("click", () => {
    const carritoMenu = document.querySelector(".carritoMenu");
    carritoMenu.style.display = (carritoMenu.style.display === 'block') ? 'none' : 'block';
});