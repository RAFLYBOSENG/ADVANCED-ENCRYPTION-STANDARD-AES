import { GFMul, GFAdd } from './gf.js';
export function MixColumns(state, inverse = false) {
  const output = [], calculation = [];
  const [topLeft, topRight, bottomLeft, bottomRight] = inverse ? [0x9, 0x2, 0x2, 0x9] : [0x1, 0x4, 0x4, 0x1];
  for (let col=0; col<2; col++) { const top = state[col*2], bottom = state[col*2+1]; const a = GFMul(topLeft, top), b = GFMul(topRight, bottom), c = GFMul(bottomLeft, top), d = GFMul(bottomRight, bottom); const outTop = GFAdd(a.value, b.value), outBottom = GFAdd(c.value, d.value); output.push(outTop, outBottom); calculation.push(`Kolom ${col+1}: (${hex(topLeft)} × ${hex(top)}) XOR (${hex(topRight)} × ${hex(bottom)}) = ${hex(a.value)} XOR ${hex(b.value)} = ${hex(outTop)}`, ...a.detail, ...b.detail, `Kolom ${col+1}: (${hex(bottomLeft)} × ${hex(top)}) XOR (${hex(bottomRight)} × ${hex(bottom)}) = ${hex(c.value)} XOR ${hex(d.value)} = ${hex(outBottom)}`, ...c.detail, ...d.detail); }
  return { state: output, calculation };
}
import { hex } from './logger.js';
export const InvMixColumns = state => MixColumns(state, true);
