'use strict';

/*
 *	Torrico, Erica
 */

// Document:
const d = document;

const aProvincias = ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'];

//crear los productos:
const aProductos = [
	{
		nombre: 'Bicolor',
		descripcion: 'Óleo 80 x 60',
		precio: 15000,
		imagen: ['img/imagen1.jpg','img/01.jpg','img/01a.jpg'],
		categoria: 'Pintura',
		id: '0',
	},
	{
		nombre: 'Rectángulo',
		descripcion: 'Acrílico 120 x 80',
		precio: 35000,
		imagen: ['img/imagen2.jpg','img/02.jpg','img/02a.jpg'],
		categoria: 'Pintura',
		id: '1',
	},
	{		
		nombre: 'Manos Pintadas',
		descripcion: 'Analógico en papel 90 x 45',
		precio: 75000,
		imagen: ['img/imagen6.jpg','img/06.jpg','img/06a.jpg'],
		categoria: 'Fotografía',
		id: '2',
	},
	{
		nombre: 'San Petersburgo',
		descripcion: 'Digital en papel 90 x 68',
		precio: 23000,
		imagen: ['img/jinete.jpg','img/09.jpg','img/09a.jpg'],
		categoria: 'Fotografía',
		id: '3',
	},
	{
		nombre: 'Azul Cielo',
		descripcion: 'Acrílico 180 x 130',
		precio: 12000,
		imagen: ['img/imagen5.jpg','img/05.jpg','img/05a.jpg'],
		categoria: 'Pintura',
		id: '4',
	},
	{
		nombre: 'Cebra de juguete',
		descripcion: 'Resina 50 x 40 x 60',
		precio: 75000,
		imagen: ['img/cebra.jpg','img/07.jpg','img/07a.jpg'],
		categoria: 'Escultura',
		id: '5',
	},
	{
		nombre: 'Paradoja',
		descripcion: 'Óleo 120 x 78',
		precio: 20000,
		imagen: ['img/imagen4.jpg','img/04.jpg','img/04a.jpg'],
		categoria: 'Pintura',
		id: '6',
	},
	{
		nombre: 'Gato de la Suerte',
		descripcion: 'Cerámica 30 x 40 x 20',
		precio: 12000,
		imagen: ['img/gato.jpg','img/08.jpg','img/08a.jpg'],
		categoria: 'Escultura',
		id: '7',
	},
	{
		nombre: 'Arco Iris',
		descripcion: 'Acuarela 110 x 75',
		precio: 50000,
		imagen: ['img/imagen3.jpg','img/03.jpg','img/03a.jpg'],
		categoria: 'Pintura',
		id: '8',
	},
];

//obtener el div:
let productos = d.querySelector('#productos');

//creo un objeto para guardar los ids y cantidades de productos agregados al carrito:
let carrito = {
	productos: [],
	cantidad: []
};

let cont = 0, 
	acum = 0;

let categoriaActual = ''; 

CrearDestacados();

let botonFiltros = d.querySelector('#botonFiltros');
botonFiltros.onclick = MostrarFiltros;

let aBotonera = d.querySelectorAll('section:first-of-type > div:nth-child(2) > div');

for(let boton of aBotonera) {
	boton.onclick = function() {
		productos.innerHTML = '';
		let categoriaNueva = boton.firstElementChild.lastElementChild.innerHTML;
		CargarCategorias(categoriaNueva);
		if(categoriaNueva != categoriaActual) {
			CrearBanner();
			categoriaActual = categoriaNueva;
			ActualizarCategoria();
			$('html,body').animate({
                scrollTop: ($('#seccion_productos').offset().top - 60)
            }, 100);
			if(d.querySelector('#filtros')) {
				d.querySelector('#filtros').remove();				
			}	
		}		
	}
}

//Cargar los productos en el div #productos:
CargarCategorias();

function ActualizarCategoria() {
	
	let section = d.querySelector('#seccion_productos');
	if(section.children.length ==2) {
		let span = d.createElement('span');
		span.className = 'h3';
		span.innerHTML = ' > ' + categoriaActual;
		section.insertBefore(span,productos);
	}else{
		section.firstElementChild.nextElementSibling.innerHTML = ' > ' + categoriaActual;
	}
}

function CrearBanner() {
	let div = d.createElement('div');
	div.id = 'banner';
	d.querySelector('body').appendChild(div);

		let div1 = CrearBotonCerrar(div);

	// determinar un indice aleatorio para aProductos:
	let num = Math. random();
	let max = aProductos.length - 1;
	let min = 0;
	let rango = max - min;
	num = num * rango; 
	num = Math.floor(num);
	num = num + min;

	let p = d.createElement('p');
	p.className = 'h2 colorado'
	p.innerHTML = aProductos[num].categoria + ' destacada';
	div1.appendChild(p);

	let div2 = d.createElement('div');
	div1.appendChild(div2);
	div2.className = 'd-flex';

		let img = CrearImg(aProductos[num],div2);
		img.className = '';

		div = d.createElement('div');
		div2.appendChild(div);
		div.className = 'd-flex flex-column ml-3 w-50 justify-content-between';

			div1 = d.createElement('div');
			div.appendChild(div1);

			CargarDatosProducto(aProductos[num],div1);

			CrearBotonAgregar(aProductos[num],div);

	// Quitar banner:
	setTimeout(function(){
			let banner = d.querySelector('#banner');
			if(banner != null) {
				banner.remove();
			}
	},10000);
	
}

function CargarCategorias(unString='') {

	for(let producto of aProductos) {
		if(producto.categoria==unString || unString=='') {

			let div = d.createElement('div');
			div.className = 'col-sm-6 col-md-4';

			let img = CrearImg(producto,div);

			img.onclick = function () {
				Ampliar(producto);
			}

			let div2 = d.createElement('div');
			div.appendChild(div2);

			CargarDatosProducto(producto,div2);

			CrearBotonAgregar(producto,div2);

			productos.appendChild(div);
		}
	}
}

function CargarDatosProducto(producto,div) {

	// Crear el h3:
	let h3 = d.createElement('h3');
	h3.innerHTML = producto.nombre;
	div.appendChild(h3);

	// Crear el p con la descripción:
	let p = d.createElement('p');
	p.innerHTML = producto.descripcion;
	div.appendChild(p);

	// Crear el p con el precio:
	p = d.createElement('p');
	p.className = 'azul negrita';
	p.innerHTML = '$ ';
	div.appendChild(p);

	let span = d.createElement('span');
	span.className = 'h4';
	span.innerHTML = producto.precio;
	p.appendChild(span);	 
}

function Agregar(id) {

	// Verificar si ya existe el producto en el carrito:
	let indice = carrito.productos.indexOf(id);
	if (indice != -1) {
		carrito.cantidad[indice]++;
	} else {
		carrito.productos.push(id);
		carrito.cantidad.push(1);
	}

	ActualizarCarrito(); 
}

function ActualizarCarrito() {	
	cont = ActualizarCont();
	acum = ActualizarAcum();
	MostrarMiniCarritoActualizado();
}

function ActualizarCont() {
	cont = 0;
	for (let numero of carrito.cantidad) {
		cont += numero;
	}
	return cont;
}

function ActualizarAcum() {
	acum = 0;

	carrito.productos.forEach(function (id, indice) {	
		acum += aProductos[id].precio * parseInt(carrito.cantidad[indice]);
	})
	return acum;
}

function MostrarMiniCarritoActualizado() {
	d.querySelector('#minicarrito').firstElementChild.firstElementChild.innerHTML = acum;
	d.querySelector('#minicarrito').firstElementChild.lastElementChild.innerHTML = cont;	
}

// Generar la ventana modalProducto:
function Ampliar(producto) {

	let div = CrearModal('Producto');

	CrearGaleria(producto,div);

	CargarDatosProducto(producto,div);

	CrearBotonAgregar(producto,div);
}

function CrearBotonAgregar(producto,div) {

	let button = d.createElement('button');
	button.innerHTML = 'Agregar';
	button.className = 'boton';
	div.appendChild(button);

	button.onclick = function () {
		Agregar (producto.id);
		Notificar(div);
	}
}

function CrearImg(producto,div,n=1) {

	let figure = d.createElement('figure');

	for (var i = 0; i < n; i++) {

		let picture = d.createElement('picture');
		figure.appendChild(picture);

			let source = d.createElement('source');
			source.media = '(min-width: 768px)';
			source.srcset = producto.imagen[i].slice(0,-4).concat('_sm.jpg');	
			picture.appendChild(source);

			let img = d.createElement('img');
			img.src = producto.imagen[i];
			img.alt = producto.nombre + ', ' + producto.categoria + ', ' + producto.descripcion;
			img.className = 'img-fluid';
			picture.appendChild(img);
	}

	div.appendChild(figure);
	return figure.firstElementChild.lastElementChild;
}

function CrearGaleria(producto,div) {

	let imgGrande = CrearImg(producto,div);

	let div1 = d.createElement('div');
	div1.className = 'd-flex align-items-center my-3 my-md-0 py-1 px-0';
	div.appendChild(div1);

	let ant = d.createElement('div');
	ant.id = 'ant';
	ant.setAttribute('role','button');
	div1.appendChild(ant);

	let img1 = CrearImg(producto,div1,3);

	let sig = d.createElement('div');
	sig.id = 'sig';
	sig.setAttribute('role','button');
	div1.appendChild(sig);

	let aImgs = d.querySelectorAll('#modalProducto div div figure picture img');
	aImgs[0].style.cssText = 'border: solid 3px #cc6666;';


	let posActual = 0;
	let posInicial = 0;
	let posFinal = aImgs.length - 1;

	// cambiar el src recorriendo el array de imágenes:
	for (let imagenMini of aImgs) {
		imagenMini.onclick = function() {
			for (let i = 0; i < aImgs.length; i++) {
				aImgs[i].style.cssText = '';				
			}
			this.style.cssText = 'border: solid 3px #cc6666;';
			imgGrande.src = this.getAttribute('src');
			imgGrande.parentNode.firstElementChild.srcset = this.parentNode.firstElementChild.getAttribute('srcset');

			switch(this) {
				case aImgs[0]:
					posActual = 0;										
					break;
				case aImgs[1]:
					posActual = 1;										
					break;
				case aImgs[2]:
					posActual = 2;										
					break;
			}
		}
	}
	ant.onclick = function () {
		Navegar('izq');
	}
	sig.onclick = function () {
		Navegar('der');
	}

	function Navegar(sentido) {
		if (sentido == 'der') {
			posActual++;
			if (posActual > posFinal) {
				posActual = posInicial;
			}
		} else {
			posActual--;
			if (posActual < posInicial) {
				posActual = posFinal;
			}
		}
		ActualizarPos();
	}

	window.onkeydown = function(e) {
		switch (e.key) {
			// Izquierda:
			case 'ArrowLeft':
				posActual--;
				if (posActual < posInicial) {
					posActual = posFinal;
				}
				break;
			// Derecha:
			case 'ArrowRight':
				posActual++;
				if (posActual > posFinal) {
					posActual = posInicial;
				}
				break;
			case 'Escape':
				div.parentNode.remove();
				break;
		}
		ActualizarPos();
	}

	function ActualizarPos() {
		for (let i = 0; i < aImgs.length; i++) {
			aImgs[i].style.cssText = '';
		}
		imgGrande.src = producto.imagen[posActual];
		imgGrande.parentNode.firstElementChild.srcset = producto.imagen[posActual].slice(0,-4).concat('_sm.jpg');

		aImgs[posActual].style.cssText = 'border: solid 3px #cc6666';			
	}
}

function Cerrar() {
	this.parentNode.parentNode.remove();
	return false;
}

//Generar la ventana modalCarrito:
let miniCarrito = d.querySelector('#minicarrito');

minicarrito.title = 'Ver carrito';
miniCarrito.onclick = VerModalCarrito;

function VerModalCarrito() {

	let div = CrearModal('Carrito');

	// Crear el p:
	let p = d.createElement('p');
	p.innerHTML = 'Detalle de su compra';
	p.className = 'h5';
	div.appendChild(p);

	let ul = d.createElement('ul');
	div.appendChild(ul);

	CrearLi(ul);

	let div1 = d.createElement('div');
	div1.className = "d-sm-flex justify-content-between";
	div.appendChild(div1);

	p = d.createElement('p');
	p.className = 'h5 text-center mt-3';
	p.innerHTML = 'Cantidad de ítems: ';
	div1.appendChild(p);

	let span = d.createElement('span');
	span.id = 'contador';
	span.className = 'negrita';
	span.innerHTML = cont;
	p.appendChild(span);

	p = d.createElement('p');
	p.className = 'h5 azul text-center mt-3';
	p.innerHTML += 'Total: $ ';
	div1.appendChild(p);

	span = d.createElement('span');
	span.className = 'negrita';
	span.id = 'acumulador';
	span.innerHTML = acum;
	p.appendChild(span);

	//Crear los botones Vaciar y Comprar, sólo si el carrito no está vacío:
	if (ul.children.length!=0) {

		let button = d.createElement('button')
		button.innerHTML = 'Realizar compra';
		button.className = 'boton';
		button.onclick = Comprar;
		div.appendChild(button);

		button = d.createElement('button')
		button.innerHTML = 'Vaciar carrito';
		button.className = 'negativo';
		button.onclick = Vaciar;
		div.appendChild(button);
	}
}

function Comprar() {
	let div1 = CrearModal('Form');
	let form = d.createElement('form');
	form.action = '#'; //por ahora no utilizamos php
	form.method = 'post';
	form.className = 'container-fluid';
	div1.appendChild(form);

	let fieldset = d.createElement('fieldset');
	fieldset.className = 'container-md';
	form.appendChild(fieldset);

		let legend = d.createElement('legend');
		legend.innerHTML = 'Datos personales';
		fieldset.appendChild(legend);

		let div = d.createElement('div');
		div.className = 'form-group row';
		
			let label = d.createElement('label');
			label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
			label.innerHTML = 'Nombre:';
			div.appendChild(label);

			let input = d.createElement('input');
			input.className = 'form-control col-sm-6 col-md-7 col-lg-5';
			input.type = 'text';
			input.name = 'nombre';
			input.autofocus = 'true';
			div.appendChild(input);

		fieldset.appendChild(div);

		div = d.createElement('div');
		div.className = 'form-group row';
		
			label = d.createElement('label');
			label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
			label.innerHTML = 'Teléfono:';
			div.appendChild(label);

			input = d.createElement('input');
			input.className = 'form-control col-sm-6 col-md-7 col-lg-5';
			input.type = 'tel';
			input.name = 'telefono';
			div.appendChild(input);

		fieldset.appendChild(div);

		div = d.createElement('div');
		div.className = 'form-group row';
		
			label = d.createElement('label');
			label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
			label.innerHTML = 'Email:';
			div.appendChild(label);

			input = d.createElement('input');
			input.className = 'form-control col-sm-6 col-md-7 col-lg-5';
			input.type = 'email';
			input.name = 'email';
			div.appendChild(input);

			HacerRequerido(input);

		fieldset.appendChild(div);

	fieldset = d.createElement('fieldset');
	fieldset.className = 'container-md';
	form.appendChild(fieldset);

		legend = d.createElement('legend');
		legend.innerHTML = 'Información de envío';
		fieldset.appendChild(legend);

		div = d.createElement('div');
		div.className = 'form-group row';
		
			label = d.createElement('label');
			label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
			label.innerHTML = 'Domicilio:';
			div.appendChild(label);

			input = d.createElement('input');
			input.className = 'form-control col-sm-6 col-md-7 col-lg-5';
			input.type = 'text';
			input.name = 'direccion';
			div.appendChild(input);

			HacerRequerido(input);

		fieldset.appendChild(div);

		div = d.createElement('div');
		div.className = 'form-group row';

			label = d.createElement('label');
			label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
			label.innerHTML = 'Seleccione provincia:';
			div.appendChild(label);
		
			let select = d.createElement('select');
			select.className = 'form-control col-sm-6 col-md-7 col-lg-5';
			select.name = 'provincia';
			div.appendChild(select);

			ArmarProvincias(select);

		fieldset.appendChild(div);

		div = d.createElement('div');
		div.className = 'form-group row';
		
			label = d.createElement('label');
			label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
			label.innerHTML = 'Fecha de entrega:';
			div.appendChild(label);

			input = d.createElement('input');
			input.className = 'form-control col-sm-6 col-md-7 col-lg-5';
			input.type = 'date';
			input.name = 'fecha';
			input.min = ObtenerFecha(1);
			div.appendChild(input);

		fieldset.appendChild(div);

	fieldset = d.createElement('fieldset');
	fieldset.className = 'container-md';
	form.appendChild(fieldset);

		legend = d.createElement('legend');
		legend.innerHTML = 'Medio de pago';
		fieldset.appendChild(legend);

		div = d.createElement('div');
		div.className = 'form-group d-flex justify-content-between';

			let div2 = d.createElement('div');
			div2.className = 'form-check form-check-inline';
		
				label = d.createElement('label');
				label.className = 'form-check-label';
				label.innerHTML = 'Tarjeta de crédito';
				label.style.backgroundColor = '#ffcc66';
				div2.appendChild(label);

				input = d.createElement('input');
				input.className = 'form-check-input';
				input.type = 'radio';
				input.name = 'medio';
				input.value = 'credito';
				input.onclick = function() {
					PedirDatos(div,this.value);
					ColorLabel(this.parentNode);
				}
				input.checked = 'checked';
				label.appendChild(input);

			div.appendChild(div2);

			div2 = d.createElement('div');
			div2.className = 'form-check form-check-inline';
		
				label = d.createElement('label');
				label.className = 'form-check-label';
				label.innerHTML = 'Tarjeta de débito';
				div2.appendChild(label);

				input = d.createElement('input');
				input.className = 'form-check-input';
				input.type = 'radio';
				input.name = 'medio';
				input.value = 'debito';
				input.onclick = function() {
					PedirDatos(div,this.value);
					ColorLabel(this.parentNode);
				}
				label.appendChild(input);

			div.appendChild(div2);

			div2 = d.createElement('div');
			div2.className = 'form-check form-check-inline';
		
				label = d.createElement('label');
				label.className = 'form-check-label';
				label.innerHTML = 'Efectivo';
				div2.appendChild(label);

				input = d.createElement('input');
				input.className = 'form-check-input';
				input.type = 'radio';
				input.name = 'medio';
				input.value = 'efectivo';
				input.onclick = function() {
					let detalles = d.querySelector('#detallesPago');
					detalles.innerHTML = '';
					
						let div3 = d.createElement('div');
						div3.className = 'custom-control custom-radio';
							
							input = d.createElement('input');
							input.className = 'custom-control-input';
							input.type = 'radio';
							input.name = 'empresa';
							input.id = 'rapipago';
							input.value = 'rapipago';
							input.checked = 'checked';
							div3.appendChild(input);

							label = d.createElement('label');
							label.className = 'custom-control-label';
							label.innerHTML = 'RapiPago';
							label.htmlFor = 'rapipago';				
							div3.appendChild(label);

						detalles.appendChild(div3);

						div3 = d.createElement('div');
						div3.className = 'custom-control custom-radio';
					
							input = d.createElement('input');
							input.className = 'custom-control-input';
							input.type = 'radio';
							input.name = 'empresa';
							input.id = 'pagofacil';
							input.value = 'pagofacil';
							div3.appendChild(input);

							label = d.createElement('label');
							label.className = 'custom-control-label';
							label.innerHTML = 'PagoFácil';
							label.htmlFor = 'pagofacil'
							
							div3.appendChild(label);

						detalles.appendChild(div3);
				
					ColorLabel(this.parentNode);
				}
				label.appendChild(input);

			div.appendChild(div2);

		fieldset.appendChild(div);

		div = d.createElement('div');
		div.id = 'detallesPago';
		div.className = 'd-flex flex-column align-items-center';
		fieldset.appendChild(div);

		PedirDatos(div,'credito');

	input = d.createElement('input');
	input.type = 'submit';
	input.className = 'boton';
	input.value = 'Finalizar compra';
	form.appendChild(input);

	let mensajeError = d.createElement('p');
	form.appendChild(mensajeError);

	form.onsubmit = function () {
		let control = true;
		mensajeError.innerHTML = '';

		let aRequired = d.querySelectorAll('[data-required]');

		for(let input of aRequired) {
			if (input.value == '') {
				mensajeError.innerHTML = 'Debe completar los campos requeridos';
				input.style.borderColor = 'red';
				control = false;
				return  control;
			}
		}
		//return control; (esta línea representaría el resultado de la validación del form)
		if(control) {
			Agradecer();
			d.querySelector('#modalForm').remove();
			Vaciar();
			d.querySelector('#modalCarrito').remove();			
		}
		return false; // utilizo este método para simular el envío correcto del formulario sin php y que no recargue la página
	}
}

function Agradecer() {
	let div = CrearModal('Gracias');

		let div1 = d.createElement('div');
		div1.className = 'mb-5 mb-md-0 d-flex flex-column align-items-center';
		div.appendChild(div1);

			div = d.createElement('div');
			div.className = 'my-4';
			div1.appendChild(div);

			let p = d.createElement('p');
			p.className = 'h2 azul mt-4';
			p.innerHTML = 'Muchas gracias!';
			div1.appendChild(p);

			p = d.createElement('p');
			p.className = 'mt-2';
			p.innerHTML = 'Su compra fue realizada con éxito';
			div1.appendChild(p);
}
	
function CrearModal(unString) {

	// Crear el div:
	let div = d.createElement('div');
	div.className = 'modal1';
	div.id = 'modal' + unString;
	d.querySelector('body').appendChild(div);
		let div1 = CrearBotonCerrar(div);
	return div1;
}

function CrearBotonCerrar(div) {
	let div2 = d.createElement('div');
	div.appendChild(div2);

	// Crear el a:
	let a = d.createElement('a');
	a.href = 'javascript:void(0)';
	a.className = 'cerrar';
	a.innerHTML = 'Cerrar';
	a.onclick = Cerrar;
	div2.appendChild(a);

	window.onkeydown = function(e) {
		if (e.key == 'Escape') {
			div.remove();
		}
	}
	return(div2);
}

function CrearLi(ul) {	
	
	carrito.productos.forEach(function (valor, indice) {

		let li = d.createElement('li');			
		li.className = 'row';
//el valor de carrito.productos es el id del producto en aProductos:
		
		let img = d.createElement('img');
		img.alt = aProductos[valor].nombre;
		img.src = aProductos[valor].imagen[0].slice(0,-4).concat('_mini.jpg');		
		img.className = 'img-fluid col-auto';
		li.appendChild(img);

		let span = d.createElement('span');
		span.className = 'col-6 col-md-4 negrita';
		span.innerHTML += aProductos[valor].nombre;
		li.appendChild(span);

		let div = d.createElement('div');
		div.className = 'col-6 col-sm-3 order-4 col-md-2 order-md-3';
		li.appendChild(div);

			span = d.createElement('span');
			span.innerHTML = '-';
			span.className = 'negrita colorado';
			span.title = 'Quitar una unidad';
			span.style.cursor = 'pointer';

			span.onclick = function () {
				Restar(indice);
			};

			div.appendChild(span);

			span = d.createElement('span');
			span.innerHTML = carrito.cantidad[indice];
			div.appendChild(span);

			span = d.createElement('span');
			span.innerHTML = '+';
			span.className = 'negrita colorado';
			span.title = 'Agregar una unidad';
			span.style.cursor = 'pointer';

			span.onclick = function () {
				Sumar(indice);
			};

			div.appendChild(span);

		span = d.createElement('span');
		span.className = 'col-6 col-sm-3 offset-sm-6 offset-md-0 order-5 order-md-3 azul';
		span.innerHTML = '$ ' + aProductos[valor].precio;
		li.appendChild(span);

		span = d.createElement('span');
		span.className = 'order-3 col-2 col-md-1 order-md-12 ml-auto'
		span.innerHTML = 'Quitar';
		span.title = 'Quitar todas las unidades';
		span.style.cursor = 'pointer';

		span.onclick = function () {
			Quitar(indice);
		};

		li.appendChild(span);

		ul.appendChild(li);
	});
}

function Sumar(indice) {
	// Actualizo el índice de la cantidad:
	carrito.cantidad[indice]++;

	ActualizarLi();
	ActualizarCarrito();	
	ActualizarModalCarrito();
}

function Restar(indice) {

	// Verifico si llegó a cero:
	if (carrito.cantidad[indice] > 0) {
		// Si existe, actualizo el índice de la cantidad:
		carrito.cantidad[indice]--;

		if (carrito.cantidad[indice] == 0) {
			carrito.productos.splice(indice, 1);
			carrito.cantidad.splice(indice, 1);
		}
	}

	ActualizarLi();
	ActualizarCarrito();	
	ActualizarModalCarrito();
}

function Quitar(indice) {	
	carrito.productos.splice(indice,1);
	carrito.cantidad.splice(indice,1);
	ActualizarLi();
	ActualizarCarrito();	
	ActualizarModalCarrito();
}

function ActualizarLi() {
	let ul = VaciarUl();
	CrearLi(ul);
	VerificarBotones(ul);
}

function VaciarUl() {
	let ul = d.querySelector('#modalCarrito ul');
	ul.innerHTML = '';
	return ul;
}

function VerificarBotones(ul) {
	if (ul.children.length==0) {
		BorrarBotones();
	}
}

function BorrarBotones() {
		d.querySelectorAll('#modalCarrito button')[1].remove();
		d.querySelectorAll('#modalCarrito button')[0].remove();
}

function ActualizarModalCarrito() {
	d.querySelector('#contador').innerHTML = cont;
	d.querySelector('#acumulador').innerHTML = acum;
}

function Vaciar() {	
	carrito.productos = [];
	carrito.cantidad = [];
	ActualizarCarrito();
	ActualizarModalCarrito();
	VaciarUl();
	BorrarBotones();
}

// Obtener fecha de entrega disponible a partir de un día posterior a la compra:
function ObtenerFecha(cantidad) {
	let fechaActual = new Date();
	let fechaPermitida = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + cantidad);
	let mes = parseInt(fechaPermitida.getMonth()) + 1;
	let dia = fechaPermitida.getDate();
	mes = AgregarCero(mes);
	dia = AgregarCero(dia);
	let fecha = fechaPermitida.getFullYear() + '-' + mes + '-' + dia;
	return fecha;
}

function AgregarCero(numero) {
	let numeroNuevo;
	if (numero < 10) {
		numeroNuevo = '0' + numero;
	} else {
		numeroNuevo = numero;
	}
	return numeroNuevo;
}

function ArmarProvincias(select) {
	
	for (let provincia of aProvincias) {
		let option = d.createElement('option');
		option.innerHTML = provincia;
		option.value = provincia;
		select.appendChild(option);
	}
}

function PedirDatos(div1,unString) {
	div1.innerHTML = '';
	let div = d.createElement('div');
	div.className = 'form-group row';
	
		let label = d.createElement('label');
		label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
		label.innerHTML = 'Número de la tarjeta:';
		div.appendChild(label);

		let input = d.createElement('input');
		input.className = 'form-control col-sm-6 col-md-7 col-lg-5';
		input.type = 'number';
		input.name = unString + '_numero';
		div.appendChild(input);

	div1.appendChild(div);

	div = d.createElement('div');
	div.className = 'form-group row';
	
		label = d.createElement('label');
		label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
		label.innerHTML = 'Nombre y apellido:';
		div.appendChild(label);

		input = d.createElement('input');
		input.className = 'form-control col-sm-6 col-md-7 col-lg-5';
		input.type = 'text';
		input.name = unString + '_nombre';
		div.appendChild(input);

	div1.appendChild(div);

	div = d.createElement('div');
	div.className = 'form-group row';
	
		label = d.createElement('label');
		label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
		label.innerHTML = 'Fecha de vencimiento:';
		div.appendChild(label);

		input = d.createElement('input');
		input.className = 'form-control col-sm-6 col-md-7 col-lg-5';
		input.type = 'month';
		input.name = unString + '_vencimiento';
		input.min = ObtenerFecha(0); 
		input.placeholder = 'AAAA-MM';
		
		div.appendChild(input);

	div1.appendChild(div);

	div = d.createElement('div');
	div.className = 'form-group row';
	
		label = d.createElement('label');
		label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
		label.innerHTML = 'Código de seguridad:';
		div.appendChild(label);

		input = d.createElement('input');
		input.className = 'form-control col-sm-6 col-md-7 col-lg-5';
		input.type = 'number';
		input.name = unString + '_codigo';
		div.appendChild(input);

	div1.appendChild(div);

	div = d.createElement('div');
	div.className = 'form-group row';
	
		label = d.createElement('label');
		label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
		label.innerHTML = 'DNI del titular:';
		div.appendChild(label);

		input = d.createElement('input');
		input.className = 'form-control col-sm-6 col-md-7 col-lg-5';
		input.type = 'number';
		input.name = unString + '_dni';
		div.appendChild(input);

	div1.appendChild(div);

	if(unString == 'credito') {
		div = d.createElement('div');
		div.className = 'form-group row';
		
			label = d.createElement('label');
			label.className = 'col-sm-6 col-md-5 offset-lg-1 offset-xl-2 col-xl-3';
			label.innerHTML = 'Cuotas:';
			label.htmlFor = 'cuotas';
			div.appendChild(label);

			let select = d.createElement('select');
			select.className = 'form-control col-sm-6 col-md-7 col-lg-5';
			select.name = 'cuotas';
			select.id = 'cuotas';
			div.appendChild(select);

				let option = d.createElement('option');
				option.innerHTML = '1';
				option.value = '1';
				select.appendChild(option);

				option = d.createElement('option');
				option.innerHTML = '3';
				option.value = '3';
				select.appendChild(option);

				option = d.createElement('option');
				option.innerHTML = '6';
				option.value = '6';
				select.appendChild(option);

				option = d.createElement('option');
				option.innerHTML = '12';
				option.value = '12';
				select.appendChild(option);

		div1.appendChild(div);
	}
}

function ColorLabel(elemento) {
	let aRadio = d.querySelectorAll('#modalForm [class="form-check-label"]');
	for (let label of aRadio) {
		label.style.backgroundColor = 'transparent';
	}
	elemento.style.backgroundColor = '#ffcc66';
}

function MostrarFiltros() {
	let section = d.querySelector('section:first-of-type');
	if(section.firstElementChild.nextElementSibling.id != 'filtros') {

		let div = d.createElement('div');
		div.id = 'filtros';
		div.className = 'row';
		section.insertBefore(div,section.firstElementChild.nextElementSibling);

			let div1 = CrearBotonCerrar(div);
			div1.className = 'col-2 order-12';

			let p = d.createElement('p');
			p.innerHTML = 'Filtros';
			p.className = 'col-2 h4';
			div.appendChild(p);

			let form = d.createElement('form');
			form.className = 'col-8';
			div.appendChild(form);

				let fieldset = d.createElement('fieldset');
				form.appendChild(fieldset);

					let legend = d.createElement('legend');
					legend.innerHTML = 'Categoría';
					fieldset.appendChild(legend);

					div = d.createElement('div');
					div.className = 'form-group';
					fieldset.appendChild(div);

					CrearCategorias(div,'Pintura');

					CrearCategorias(div,'Escultura');

					CrearCategorias(div,'Fotografía');

				let input = d.createElement('input');
				input.type = 'button';
				input.className = 'boton';
				input.value = 'Aplicar filtro';
				form.appendChild(input);

		// Verificar checkbox en Filtros:

		let mensajeError = d.createElement('div');
		fieldset.appendChild(mensajeError);
		mensajeError.style.color = 'red';

		d.querySelector('section:first-of-type form input[type="button"]').onclick= function() {
			productos.innerHTML = '';

			let control = true;
			mensajeError.innerHTML = '';

			let aCategorias = [];
			let aCheckbox = d.querySelectorAll('section:first-of-type [type=checkbox]');		
			
			// Verificar que haya al menos una opción checked:
			for (let checkbox of aCheckbox) {

				// Si existe, la guardo:
				if (checkbox.checked) {
					aCategorias.push(checkbox);
					CargarCategorias(checkbox.name);
				}
			}
			if (aCategorias.length == 0) {
				mensajeError.innerHTML += 'Debe seleccionar al menos una categoría';
				control = false;
			} else {
				categoriaActual = aCategorias.map(function(categoria){
					return categoria.name;
				}).join(' + ');
				ActualizarCategoria();
				d.querySelector('#filtros').remove();
			$('html,body').animate({
                scrollTop: ($('#seccion_productos').offset().top - 60)
            }, 100);
			}						
			return control;		
		}
	} else {
		d.querySelector('#filtros').remove();
	}
}

function CrearCategorias(div,unString) {
	let div2 = d.createElement('div');
	div2.className = 'custom-control custom-checkbox';
	div.appendChild(div2);

	let input = d.createElement('input');
	input.className = 'custom-control-input';
	input.type = 'checkbox';
	input.name = unString;
	input.id = unString;
	div2.appendChild(input);

	// Chequear input:
	if (unString == categoriaActual) {
		input.checked = 'checked';
	}

	let label = d.createElement('label');
	label.className = 'custom-control-label';
	label.innerHTML = unString;
	label.htmlFor = unString;
	div2.appendChild(label);
}

function HacerRequerido(unInput) {
	unInput.dataset.required = 'true';
	unInput.previousElementSibling.className += ' negrita';

	let span = d.createElement('span');
	span.innerHTML = '(campo requerido)';
	span.className = 'negrita azul chica';
	unInput.previousElementSibling.appendChild(span);
}

function CrearDestacados() {

	let obras = d.querySelector('#obras');

		let table = d.createElement('table');
		table.className = 'table table-responsive';
		obras.appendChild(table);
			let tbody = d.createElement('tbody');
			table.appendChild(tbody);
					let tr = d.createElement('tr');
					tbody.appendChild(tr);

	for(let producto of aProductos) {
		if(producto.id%2==0) {

			let th = d.createElement('th');

			let div = d.createElement('div');

			th.appendChild(div);

			let img = CrearImg(producto,div);

			img.onclick = function () {
				Ampliar(producto);
			}

			let div2 = d.createElement('div');
			div.appendChild(div2);

			CargarDatosProducto(producto,div2);

			CrearBotonAgregar(producto,div2);

			tr.appendChild(th);
		}
	}
}

function Notificar(boton) {
	let div = d.createElement('div');
	div.id = 'notificacion';
	boton.insertBefore(div,boton.lastElementChild);

		let div1 = CrearBotonCerrar(div);

		let p = d.createElement('p');
		div.appendChild(p);
		p.innerHTML = 'Producto agregado al carrito';

	setTimeout(function() {
		div.remove();
	},3000);
}
