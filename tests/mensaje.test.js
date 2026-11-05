import test from 'node:test'; 

import assert from 'node:assert/strict'; 

import { saludar } from '../src/mensaje.js'; 

 
test('saluda con el nombre ingresado', () => { 
  assert.equal(saludar('Ana'), 'Hola, Ana'); 
}); 

test('elimina espacios al inicio y final', () => { 
  assert.equal(saludar('  Ana  '), 'Hola, Ana'); 
}); 

test('rechaza un nombre vacio', () => { 
  assert.throws(() => saludar('   '), /Ingrese un nombre/); 
}); 