import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeNormalizerService {
  normalizeMinifiedCode(code: string): string {
    if (!code) return '';

    if (code.includes('\n')) return code;

    let result = code.replace(/;/g, ';\n');

    result = result.replace(/{/g, '{\n');
    result = result.replace(/}/g, '\n}\n');

    return this.simpleIndent(result);
  }

  private simpleIndent(code: string): string {
    const lines = code.split('\n');
    let indent = 0;
    const indentSize = 2;

    return lines
      .map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';

        if (trimmed.startsWith('}')) indent--;

        const spaces = ' '.repeat(Math.max(0, indent * indentSize));
        const result = spaces + trimmed;

        if (trimmed.endsWith('{')) indent++;

        return result;
      })
      .filter(line => line !== '')
      .join('\n');
  }
}