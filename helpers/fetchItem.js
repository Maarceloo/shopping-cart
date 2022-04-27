const fetchItem = (id) => {
  if (!id) {
    return Error('You must provide an url');
  }
  const URL = fetch(`https://api.mercadolibre.com/items/${id}`);
  return URL.then((result) => result.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
