export const hexToBytes = (text: string) => {
  let result: number[] = [];

  for (let i = 0; i < text.length; i += 2) {
    result.push(parseInt(text.substr(i, 2), 16));
  }

  return Uint8Array.from(result);
};
