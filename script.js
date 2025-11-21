document.addEventListener('DOMContentLoaded', () => {
  const loadmoreBtn = document.querySelector('#load-more');
  const carritoBody = document.querySelector('#lista-carrito tbody');
  const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
  const comprarCarritoBtn = document.querySelector('#comprar-carrito');
  const boxContainer = document.querySelector('.box-container');
  const boxes = Array.from(document.querySelectorAll('.box-container .box'));
  let currentItem = 8; // los primeros 8 ya visibles

  for (let i = 0; i < currentItem && i < boxes.length; i++) {
    boxes[i].style.display = 'inline-block';
  }

  loadmoreBtn.addEventListener('click', () => {
    for (let i = currentItem; i < currentItem + 4 && i < boxes.length; i++) {
      boxes[i].style.display = 'inline-block';
    }
    currentItem += 4;
    if (currentItem >= boxes.length) loadmoreBtn.style.display = 'none';
  });

  boxContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar-carrito')) {
      const box = e.target.closest('.box');
      const nombre = box.querySelector('h3').innerText;
      const precio = box.querySelector('.precio').innerText;
      const imgSrc = box.querySelector('img').src;

      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td><img src="${imgSrc}" width="50"></td>
        <td>${nombre}</td>
        <td>${precio}</td>
      `;
      carritoBody.appendChild(fila);

      const mensajeCompra = document.querySelector('#mensaje-compra');
      if (mensajeCompra) mensajeCompra.remove();
    }
  });

  vaciarCarritoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    carritoBody.innerHTML = '';
    const mensajeCompra = document.querySelector('#mensaje-compra');
    if (mensajeCompra) mensajeCompra.remove();
  });

  comprarCarritoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const filas = carritoBody.querySelectorAll('tr');

    if (filas.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    let total = 0;
    filas.forEach(fila => {
      const precioTexto = fila.cells[2].innerText;
      const precioNumero = parseFloat(precioTexto.replace('$',''));
      total += precioNumero;
    });

    let mensajeCompra = document.querySelector('#mensaje-compra');
    if (!mensajeCompra) {
      mensajeCompra = document.createElement('p');
      mensajeCompra.id = "mensaje-compra";
      mensajeCompra.style.fontWeight = "bold";
      mensajeCompra.style.color = "#7A5630"; /* café oscuro */
      mensajeCompra.style.marginTop = "10px";
      document.querySelector('#carrito').appendChild(mensajeCompra);
    }
    mensajeCompra.innerText = `¡Gracias por tu compra! Su total es de: $${total}`;
    carritoBody.innerHTML = '';
  });
});

