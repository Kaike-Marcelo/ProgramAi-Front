import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdownToHtml',
  standalone: true
})
export class MarkdownToHtmlPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;

    let result = '';
    let currentIndex = 0;
    let match;

    codeBlockRegex.lastIndex = 0;

    while ((match = codeBlockRegex.exec(value)) !== null) {
      const before = value.substring(currentIndex, match.index);
      result += this.escapeHtml(before).replace(/\n/g, '<br>');

      const language = match[1];
      const code = match[2];
      const escapedCode = this.escapeHtml(code);
      const langClass = language ? `language-${language.toLowerCase()}` : '';

      result += `
        <div class="my-4 rounded-lg overflow-hidden border border-base-300">
          ${language ? `<div class="bg-base-300 px-4 py-2 text-sm font-mono">${language}</div>` : ''}
          <pre class="bg-base-200 p-4 overflow-x-auto"><code class="font-mono text-sm ${langClass}">${escapedCode}</code></pre>
        </div>
      `;

      currentIndex = match.index + match[0].length;
    }

    const after = value.substring(currentIndex);
    result += this.escapeHtml(after).replace(/\n/g, '<br>');

    return result;
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
