import fs from 'node:fs';
import path from 'node:path';

export function readCsv<T extends object>(
  filename: string
): T[] {
  const filePath = path.resolve(process.cwd(), filename);
  const content = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');

  const lines = content
    .split(/\r?\n/)
    .filter(line => line.trim().length > 0);

  if (lines.length < 2) {
    throw new Error(`CSV must contain a header and at least one row: ${filename}`);
  }

  const headers = lines[0].split(',').map(header => header.trim());

  return lines.slice(1).map((line, index) => {
    const values = line.split(',').map(value => value.trim());

    if (values.length !== headers.length) {
      throw new Error(`Invalid CSV row ${index + 2}: ${line}`);
    }

    const row = Object.fromEntries(
      headers.map((header, columnIndex) => [header, values[columnIndex]])
    );

    return row as T;
  });
}