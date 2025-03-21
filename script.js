// Productos con una propiedad de valoraciones
const productos = [
    { nombre: "Camiseta Ecológica", precio: 35000, imagen: "imagenes/camiseta-ecologica.png", categoria: "ropa", valoraciones: [] },
    { nombre: "Pantalón Eco-Friendly", precio: 45000, imagen: "imagenes/pantalon-eco-friendly.png", categoria: "ropa", valoraciones: [] },
    { nombre: "Chaqueta Reciclada", precio: 75000, imagen: "imagenes/chaqueta-reciclada.png", categoria: "ropa", valoraciones: [] },
    { nombre: "Sudadera Vegana", precio: 50000, imagen: "imagenes/sudadera-vegana.png", categoria: "ropa", valoraciones: [] },
    { nombre: "Zapatos de Cuero Vegetal", precio: 120000, imagen: "imagenes/zapatos-cuero-vegetal.png", categoria: "accesorios", valoraciones: [] },
    { nombre: "Sombrero de Paja Orgánica", precio: 35000, imagen: "imagenes/sombrero-paja-organica.png", categoria: "accesorios", valoraciones: [] },
    { nombre: "Bolsos de Tela Reciclada", precio: 45000, imagen: "imagenes/bolsos-tela-reciclada.png", categoria: "accesorios", valoraciones: [] },
    { nombre: "Pantalones Cortos de Bambú", precio: 30000, imagen: "imagenes/pantalones-cortos-bambu.png", categoria: "ropa", valoraciones: [] },
    { nombre: "Cinturón de Cáñamo", precio: 25000, imagen: "imagenes/cinturon-canamo.png", categoria: "accesorios", valoraciones: [] },
    { nombre: "Bufanda de Lana Orgánica", precio: 20000, imagen: "imagenes/bufanda-lana-organica.png", categoria: "ropa", valoraciones: [] }
];

// Carrito de compras
let carrito = [];

// Función para mostrar productos
function mostrarProductos() {
    const listaProductos = document.getElementById('productos-lista');
    listaProductos.innerHTML = ''; // Limpiar lista de productos

    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.id = `producto-${index}`; // Asignar ID al producto
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <div class="valoracion" id="valoracion-${index}">
                ${crearEstrellas(index)} <!-- Añadir las estrellas -->
            </div>
            <p>Valoración media: ${mostrarValoracionMedia(index)}</p> <!-- Mostrar la valoración media -->
            <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
        `;
        listaProductos.appendChild(productoDiv);
    });
}

// Crear las estrellas para cada producto
function crearEstrellas(index) {
    let estrellasHTML = '';
    const producto = productos[index];
    const valoracionMedia = producto.valoraciones.length ? producto.valoraciones.reduce((a, b) => a + b) / producto.valoraciones.length : 0;

    // Generar las estrellas
    for (let i = 1; i <= 5; i++) {
        const color = i <= valoracionMedia ? 'gold' : 'gray';
        estrellasHTML += `
            <span class="estrella" data-id="${index}" data-value="${i}" onclick="valorarProducto(${index}, ${i})" style="color: ${color};">&#9733;</span>
        `;
    }
    return estrellasHTML;
}

// Función para valorar un producto
function valorarProducto(index, valor) {
    const producto = productos[index];

    // Agregar la valoración al array de valoraciones
    producto.valoraciones.push(valor);

    // Actualizar la interfaz de estrellas
    actualizarEstrellas(index);

    // Mostrar la valoración media del producto
    alert(`Has valorado el producto ${producto.nombre} con ${valor} estrellas.`);
}

// Actualizar las estrellas en la interfaz
function actualizarEstrellas(index) {
    const producto = productos[index];
    const estrellas = document.querySelectorAll(`#valoracion-${index} .estrella`);
    const valoracionMedia = producto.valoraciones.length ? producto.valoraciones.reduce((a, b) => a + b) / producto.valoraciones.length : 0;

    estrellas.forEach(estrella => {
        const valor = parseInt(estrella.getAttribute('data-value'));
        estrella.style.color = valor <= valoracionMedia ? 'gold' : 'gray';
    });

    // Actualizar la valoración media del producto
    const valoracionMediaElement = document.querySelector(`#producto-${index} .valoracion-media`);
    if (valoracionMediaElement) {
        valoracionMediaElement.textContent = `Valoración media: ${valoracionMedia.toFixed(1)}`;
    }
}

// Mostrar la valoración media de cada producto
function mostrarValoracionMedia(index) {
    const producto = productos[index];
    const valoraciones = producto.valoraciones || [];
    const sumaValoraciones = valoraciones.reduce((acc, val) => acc + val, 0);
    const mediaValoracion = valoraciones.length ? (sumaValoraciones / valoraciones.length).toFixed(1) : 'Sin valoraciones';
    
    return mediaValoracion;
}

// Agregar producto al carrito
function agregarAlCarrito(index) {
    const producto = productos[index];
    carrito.push(producto);
    actualizarCarrito(); // Actualiza el carrito visualmente
    actualizarContadorCarrito(); // Actualiza el contador de productos en el carrito

    // Animación de "Agregar al carrito"
    const button = document.querySelector(`#producto-${index} button`);
    button.classList.add('agregar-al-carrito');

    setTimeout(() => {
        button.classList.remove('agregar-al-carrito');
    }, 500);
}

// Actualizar el carrito visualmente
function actualizarCarrito() {
    const carritoDiv = document.getElementById('carrito-lista');
    carritoDiv.innerHTML = '';

    let total = 0;
    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-en-carrito');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: auto;">
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <input type="number" value="1" min="1" id="cantidad-${index}" onchange="actualizarCantidad(${index})">
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        carritoDiv.appendChild(productoDiv);
        total += producto.precio;
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    carritoDiv.appendChild(totalDiv);
}

// Actualizar la cantidad de un producto en el carrito
function actualizarCantidad(index) {
    const cantidad = document.getElementById(`cantidad-${index}`).value;
    const producto = carrito[index];
    producto.precio = producto.precio * cantidad; // Actualizar el precio total
    actualizarCarrito(); // Actualizar el carrito después de cambiar la cantidad
}

// Eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito(); // Actualizar el carrito después de eliminar el producto
}

// Actualizar el contador de productos en el carrito
function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('contador-carrito');
    contadorCarrito.textContent = carrito.length; // Actualiza el número de productos en el carrito
}

// Procesar el pago
function procesarPago() {
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const medioPago = document.getElementById('medioPago').value;

    const telefonoRegex = /^[0-9]{10}$/; // Validación para 10 dígitos en el teléfono

    if (!nombre || !direccion || !telefono || !medioPago) {
        alert('Por favor complete todos los campos.');
        return;
    }

    if (!telefonoRegex.test(telefono)) {
        alert('Por favor ingrese un número de teléfono válido (10 dígitos).');
        return;
    }

    alert(`Pago procesado con éxito!\nNombre: ${nombre}\nDirección: ${direccion}\nTeléfono: ${telefono}\nMétodo de Pago: ${medioPago}`);
    carrito = []; // Limpiar el carrito después de un pago exitoso
    actualizarCarrito(); // Actualizar el carrito visualmente
}

// Filtro de productos por categoría
function filtrarProductos() {
    const categoria = document.getElementById('categoria').value;
    const listaProductos = document.getElementById('productos-lista');
    listaProductos.innerHTML = '';

    const productosFiltrados = productos.filter(producto => categoria === 'todos' || producto.categoria === categoria);
    productosFiltrados.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
        `;
        listaProductos.appendChild(productoDiv);
    });
}

// Inicializar productos al cargar la página
mostrarProductos();
