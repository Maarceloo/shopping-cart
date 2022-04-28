const locall = document.querySelector('.cart__items');
const button = document.querySelector('.empty-cart');
const divSoma = document.querySelector('.total-price');

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
  saveCartItems(locall.innerHTML);

  // const teste = event.target.innerText;
  // const retiraValor = parseFloat(teste.split('$')[1], 10);
  // console.log(retiraValor);
  // const valor = parseFloat(divSoma.innerHTML, 10);
  // console.log(valor);
  // const valorTotal = valor - retiraValor;
  // divSoma.innerHTML = valorTotal.toFixed(1);
} 

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Exercicio 05 soma 
// const somaValor = async (valor) => {
//   if (divSoma.innerHTML === '') {
//     divSoma.innerHTML = await parseFloat(valor, 0).toFixed(1);
//   } else {
//     const valorAtual = parseFloat(divSoma.innerHTML, 10);
//     const resultado = valorAtual + parseFloat(valor, 0);
//     divSoma.innerHTML = resultado.toFixed(1);
//   }
// };

// Exercicio 04
const carSaved = async () => {
  const lista = await getSavedCartItems();
  locall.innerHTML = lista;
  const li = document.querySelectorAll('.cart__item');
  li.forEach((elemento) => elemento.addEventListener('click', cartItemClickListener));
};

// Exercicio 02
const addCarrinho = async (numero) => {
  const produto = await fetchItem(numero);
  const { id, title, price } = produto;
  const obj = {
    sku: id,
    name: title,
    salePrice: price,
  };

  locall.appendChild(createCartItemElement(obj));
  saveCartItems(locall.innerHTML);

  // somaValor(price);
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

// Exercicio 06
button.addEventListener('click', () => {
  localStorage.clear();
  locall.innerText = '';
});

window.onload = () => {
  pegaItens();
  carSaved();
};
