export const hexToBytes = (hex: string) => {
  return Buffer.from(hex, 'hex');
};
