'use strict';

/*
 *	Torrico, Erica
 */

// Document:
const d = document;

//obtener el div:

let productos = d.querySelector('#productos');

//obtener las variables del minicarrito:

let cont = parseInt(d.querySelector('#minicarrito').firstElementChild.firstElementChild.innerHTML);
let acum = parseInt(d.querySelector('#minicarrito').firstElementChild.nextElementSibling.firstElementChild.innerHTML);

//crear los productos:

let aProductos = [
	{
		nombre: 'Producto A',
		descripcion: 'Descripción del producto A',
		precio: 150,
		imagen: 'producto-de-ejemplo.jpg'
	},
	{
		nombre: 'Producto B',
		descripcion: 'Descripción del producto B',
		precio: 250,
		imagen: 'producto-de-ejemplo.jpg'
	},
	{
		nombre: 'Producto C',
		descripcion: 'Descripción del producto C',
		precio: 350,
		imagen: 'producto-de-ejemplo.jpg'
	},
	{
		nombre: 'Producto D',
		descripcion: 'Descripción del producto D',
		precio: 450,
		imagen: 'producto-de-ejemplo.jpg'
	},
	{
		nombre: 'Producto E',
		descripcion: 'Descripción del producto E',
		precio: 550,
		imagen: 'producto-de-ejemplo.jpg'
	},
	{
		nombre: 'Producto F',
		descripcion: 'Descripción del producto F',
		precio: 650,
		imagen: 'producto-de-ejemplo.jpg'
	},
];

//agregar los productos al div:

for(let producto of aProductos) {
	let div = d.createElement('div');

	let img = d.createElement('img');
	img.src = producto.imagen;
	img.alt = producto.nombre;
	div.appendChild(img);

	img.onclick = function () {
		Ampliar (producto);
	}

	let div2 = d.createElement('div');
	div.appendChild(div2);

	let h3 = d.createElement('h3');
	h3.innerHTML = producto.nombre;
	div2.appendChild(h3);

	let p = d.createElement('p');
	p.innerHTML = 'Precio: $ ';
	div2.appendChild(p);

	let span = d.createElement('span');
	span.innerHTML = producto.precio;
	p.appendChild(span);

	let button = d.createElement('button');
	button.innerHTML = 'Agregar';
	div2.appendChild(button);

	button.onclick = function () {
		Agregar (producto.precio);
	}

	productos.appendChild(div);
}

function Agregar(precio) {
	cont++;
	acum += precio;
	console.info (cont,acum);
	d.querySelector('#minicarrito').firstElementChild.firstElementChild.innerHTML = cont;
	d.querySelector('#minicarrito').firstElementChild.nextElementSibling.firstElementChild.innerHTML = acum;
}

//ventana modal:

function Ampliar(producto) {
	// Crear el div:
	let div = d.createElement('div');
	div.className = 'modal';
	div.id = 'modalProducto';
	d.querySelector('body').appendChild(div);

	// Crear el a:
	let a = d.createElement('a');
	a.href = 'javascript:void(0)';
	a.innerHTML = 'X';
	a.onclick = Cerrar;
	div.appendChild(a);

	// Crear la img:
	let img = d.createElement('img');
	img.src = producto.imagen;
	img.alt = producto.nombre;
	div.appendChild(img);

	// Crear el h3:
	let h3 = d.createElement('h3');
	h3.innerHTML = producto.nombre;
	div.appendChild(h3);

	// Crear los p:
	let p = d.createElement('p');
	p.innerHTML = 'Precio: $ ';
	div.appendChild(p);

	let span = d.createElement('span');
	span.innerHTML = producto.precio;
	p.appendChild(span);

	p.innerHTML = producto.descripcion;
	div.appendChild(p);

	let button = d.createElement('button');
	button.innerHTML = 'Agregar';
	div.appendChild(button);

	button.onclick = function () {
		Agregar (producto.precio);
	}
	
}

function Cerrar() {
	d.querySelector('#modalProducto').remove();
	return false;
}
