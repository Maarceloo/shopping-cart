function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.parentNode.firstChild.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Exercicio 02
const addCarrinho = async (numero) => {
  const produto = await fetchItem(numero);
  const local = document.querySelector('.cart__items');
  const { id, title, price } = produto;
  const obj = {
    sku: id,
    name: title,
    salePrice: price,
  };
  local.appendChild(createCartItemElement(obj));
};

const codigoId = async (evento) => {
  const elemento = evento.target.parentNode;
  const id = elemento.firstChild.innerText;
  addCarrinho(id);
};

// Exercicio 01
const pegaItens = async () => {
  const array = await fetchProducts('computador');
  const local = document.querySelector('.items');
  array.results.forEach((elemento) => {
    const { id, title, thumbnail } = elemento;
    const obj = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    local.appendChild(createProductItemElement(obj));
    const button = document.querySelectorAll('.item__add');
    button.forEach((item) => item.addEventListener('click', codigoId));
  });
};

window.onload = () => {
  pegaItens();
};
