require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('teste se fetchProducts é uma funçao', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', async () => {
    await fetchProducts('computador');
    const link = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    expect(fetch).toHaveBeenCalledWith(link)
  })
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toMatchObject(computadorSearch);
  })
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const result = await fetchProducts();
    expect(result).toEqual(new Error('You must provide an url'))
  })
  // fail('Teste vazio');
});
