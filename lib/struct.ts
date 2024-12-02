
export function tsv(header: string[], ...data: string[][]): string {
  return [header.join('\t'), ...data.map(v => v.join('\t'))].join('\n');
}
