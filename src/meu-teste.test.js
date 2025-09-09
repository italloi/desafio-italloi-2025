import { AbrigoAnimais } from "./abrigo-animais.js";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar brinquedo inválido', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas('OSSINHO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar lista de animais com nomes duplicados', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'RATO,LASER', 'Rex,Mimi,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve falhar a adoção se a ordem dos brinquedos estiver incorreta', () => {
    const abrigo = new AbrigoAnimais();

    const resultado = abrigo.encontraPessoas('BOLA,RATO,LASER', 'LASER,CAIXA,RATO,SKATE,BOLA', 'Bebe');

    expect(resultado.lista[0]).toBe('Bebe - pessoa 2');
    expect(resultado.erro).toBeFalsy();
  });

  test('Não deve permitir que uma pessoa adote mais de um gato', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas('BOLA,RATO,LASER', 'CAIXA,NOVELO', 'Mimi,Fofo');

    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Mimi - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve permitir adotar o Loco apenas se a pessoa já tiver outra adoção', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas('RATO,BOLA,SKATE', '', 'Rex,Loco');

    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve manter o animal no abrigo se ambas as pessoas forem aptas', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'LASER,RATO,BOLA', 'Rex');

    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Não deve permitir que uma pessoa adote mais de 3 animais', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas('RATO,BOLA,LASER,CAIXA,NOVELO', '', 'Rex,Bebe,Bola,Zero');

    expect(resultado.lista[0]).toBe('Bebe - abrigo');
    expect(resultado.lista[1]).toBe('Bola - pessoa 1');
    expect(resultado.lista[2]).toBe('Rex - pessoa 1');
    expect(resultado.lista[3]).toBe('Zero - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

});
