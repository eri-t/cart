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
		nombre: 'Producto 1',
		descripcion: 'Descripción del producto 1',
		precio: 150,
		imagen: 'producto-de-ejemplo.jpg'
	},
	{
		nombre: 'Producto 2',
		descripcion: 'Descripción del producto 2',
		precio: 250,
		imagen: 'producto-de-ejemplo.jpg'
	},
	{
		nombre: 'Producto 3',
		descripcion: 'Descripción del producto 3',
		precio: 350,
		imagen: 'producto-de-ejemplo.jpg'
	},
	{
		nombre: 'Producto 4',
		descripcion: 'Descripción del producto 4',
		precio: 450,
		imagen: 'producto-de-ejemplo.jpg'
	},
	{
		nombre: 'Producto 5',
		descripcion: 'Descripción del producto 5',
		precio: 550,
		imagen: 'producto-de-ejemplo.jpg'
	},
	{
		nombre: 'Producto 6',
		descripcion: 'Descripción del producto 6',
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