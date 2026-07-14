import { SBOX, INV_SBOX } from './constants.js';
export const SubNibble = state => state.map(n => SBOX[n]);
export const InvSubNibble = state => state.map(n => INV_SBOX[n]);
export const SubWord = word => ((SBOX[word >> 4] << 4) | SBOX[word & 0xF]);
