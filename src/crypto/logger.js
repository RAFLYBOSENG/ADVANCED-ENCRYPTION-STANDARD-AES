export const hex = (value, width = 1) => value.toString(16).toUpperCase().padStart(width, '0');
export const bin = (value, width = 4) => value.toString(2).padStart(width, '0');
export const matrix = state => [[state[0], state[2]], [state[1], state[3]]];
export const flattenMatrix = m => [m[0][0], m[1][0], m[0][1], m[1][1]];
export const stateHex = state => state.map(n => hex(n)).join('');
export const stateBinary = state => state.map(n => bin(n)).join('');
export function logStep(step, title, description, before, after, calculation = []) {
  return { step, title, description, before: stateHex(before), after: stateHex(after), matrixBefore: matrix(before), matrixAfter: matrix(after), calculation };
}
