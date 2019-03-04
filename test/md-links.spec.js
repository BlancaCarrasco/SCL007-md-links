const mdLinks = require('./md-links.spec');


describe('mdLinks', () => {

  //   it('is a function', () => {
  //     expect(typeof example).toBe('function');
  //   });
  
  //   it('returns `example`', () => {
  //     expect(example()).toBe('example');
  //   });
  // });
  
  it('deberia reconocer un archivo .md',() => {
    expect(nombre()).toBe('archivo válido')
  });
  
  
  it('deberia leer el documento linea por linea',() => {
    expect(numerico()).toBe('linea')
  
  });
  
  it('deberia retornar los parametros dentro de []', () => {
    expect(texto()).toBe('título')
  });
  
  it('deberia retornar los parametros que esten dentro de ()', () => {
    expect(texto()).toBe('url')
  });
  
  it('deberia retornar true si la validacion es correcta', () => {
    expect(texto()).toBe('true')
  });
  
  it('deberia retornar false si stats no se reconoce', () => {
    expect(texto()).toBe(false)
  });
});
