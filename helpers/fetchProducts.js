const fetchProducts = async (elemento) => {
  if (!elemento) {
    Error('You must provide an url');
  }
  const resultado = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${elemento}`)
  .then((result) => result.json())
  .then((resultJason) => resultJason)
  .catch((error) => error);
  return resultado;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
