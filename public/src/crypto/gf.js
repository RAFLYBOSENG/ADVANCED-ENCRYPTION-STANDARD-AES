import { bin, hex } from './logger.js';
export const GFAdd = (a, b) => (a ^ b) & 0xF;
const poly = n => { const terms = []; for (let i=3;i>=0;i--) if (n & (1<<i)) terms.push(i===0?'1':i===1?'x':`x${sup(i)}`); return terms.join(' + ') || '0'; };
const sup = n => ['⁰','¹','²','³','⁴'][n];
export function GFMul(a, b) {
  let result = 0, value = a, factor = b; const trace = [];
  for (let i = 0; i < 4; i++) { if (factor & 1) { const previous = result; result ^= value; trace.push(`Bit ${i}=1: ${hex(previous)} XOR ${hex(value)} = ${hex(result)}`); } else trace.push(`Bit ${i}=0: tidak ada penambahan.`); const carry = value & 0x8; value = (value << 1) & 0xF; if (carry) { const shifted = value; value ^= 0x3; trace.push(`Shift x: overflow x⁴, ${hex(shifted)} XOR 3 = ${hex(value)} (reduksi x⁴+x+1)`); } factor >>= 1; }
  return { value: result, detail: [`${hex(a)} × ${hex(b)} = (${poly(a)})(${poly(b)})`, `Biner: ${bin(a)} × ${bin(b)}`, ...trace, `Hasil GF(2⁴): ${hex(result)} (${poly(result)})`] };
}
