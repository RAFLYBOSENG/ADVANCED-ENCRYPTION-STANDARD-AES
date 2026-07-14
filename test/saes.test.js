import test from 'node:test';
import assert from 'node:assert/strict';
import { GFMul } from '../src/crypto/gf.js';
import { KeyExpansion } from '../src/crypto/keyExpansion.js';
import { Encrypt } from '../src/crypto/encrypt.js';
import { Decrypt } from '../src/crypto/decrypt.js';

test('GF(2^4) multiplication reduces with x^4+x+1', () => {
  assert.equal(GFMul(0x4, 0xA).value, 0xE);
  assert.equal(GFMul(0x9, 0x4).value, 0x2);
});
test('official S-AES teaching vector encrypts and decrypts', () => {
  const key = 0x4AF5, plain = 0xD728;
  const expanded = KeyExpansion(key);
  assert.deepEqual(expanded.keys, [0x4AF5, 0xDD28, 0x87AF]);
  const cipher = Encrypt(plain, key);
  assert.equal(parseInt(cipher.output.map(n => n.toString(16)).join(''), 16), 0x24EC);
  const recovered = Decrypt(0x24EC, key);
  assert.equal(parseInt(recovered.output.map(n => n.toString(16)).join(''), 16), plain);
});
