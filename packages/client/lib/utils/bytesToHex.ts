const HEX = '0123456789abcdef';

export const bytesToHex = (bytes: Uint8Array) => {
  let result = [];

  for (let i = 0; i < bytes.length; i++) {
    const v = bytes[i];
    result.push(HEX[(v & 0xf0) >> 4] + HEX[v & 0x0f]);
  }

  return result.join('');
};
