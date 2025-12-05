// pruebas.test.js
const { sumar } = require('./pruebas');

describe("Prueba básica", () => {
  test("1 + 1 = 2", () => {
    expect(sumar(1, 1)).toBe(2);
  });
});
