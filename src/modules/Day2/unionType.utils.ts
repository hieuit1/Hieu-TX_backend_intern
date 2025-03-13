export function formatInput(input: string | number): string {
  if (typeof input === 'number') {
    return `Number: ${input.toFixed(2)}`;
  }
  return `String: ${input.toUpperCase()}`;
}
