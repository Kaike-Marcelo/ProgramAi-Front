import { Injectable } from '@angular/core';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { Diagnostic, linter, lintGutter } from '@codemirror/lint';
import { Extension } from '@codemirror/state';
import { LanguageDescription, syntaxTree } from '@codemirror/language';
import { search } from '@codemirror/search';
import { defaultKeymap } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import { createTheme } from '@uiw/codemirror-themes';
import { THEME_CODE_EDITOR_DEFAULT } from '../../styles/code-editor-styles';
import { csharp } from '@replit/codemirror-lang-csharp';

@Injectable({
  providedIn: 'root',
})
export class CodeEditorService {

  private languageExtensions: Record<string, () => Extension> = {
    java: () => java(),
    javascript: () => javascript(),
    typescript: () => javascript({ typescript: true }),
    csharp: () => csharp(),
    c: () => cpp(),
    python: () => python(),
    cpp: () => cpp(),
  }

  getLanguageDescriptions(): LanguageDescription[] {
    const descriptions: LanguageDescription[] = [];

    descriptions.push(
      LanguageDescription.of({
        name: 'javascript',
        alias: ['js'],
        extensions: ['js'],
        load: async () => javascript()
      })
    );

    descriptions.push(
      LanguageDescription.of({
        name: 'typescript',
        alias: ['ts'],
        extensions: ['ts'],
        load: async () => javascript({ typescript: true })
      })
    );

    descriptions.push(
      LanguageDescription.of({
        name: 'java',
        alias: [],
        extensions: ['java'],
        load: async () => java()
      })
    );

    descriptions.push(
      LanguageDescription.of({
        name: 'python',
        alias: ['py'],
        extensions: ['py'],
        load: async () => python()
      })
    );

    descriptions.push(
      LanguageDescription.of({
        name: 'cpp',
        alias: ['c++', 'c'],
        extensions: ['cpp', 'cc', 'c'],
        load: async () => cpp()
      })
    );

    descriptions.push(
      LanguageDescription.of({
        name: 'csharp',
        alias: ['c#', 'cs'],
        extensions: ['cs'],
        load: async () => csharp()
      })
    );

    return descriptions;
  }

  private basicLinter = linter((view) => {
    const diagnostics: Diagnostic[] = [];
    syntaxTree(view.state).cursor().iterate((node) => {
      if (node.name.includes('Error')) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: 'error',
          message: 'Syntax error',
          actions: [
            {
              name: 'Remove',
              apply: (view, from, to) => {
                view.dispatch({ changes: { from, to } });
              },
            },
          ],
        });
      }
    });
    return diagnostics;
  });

  private getCustomTheme(): Extension {
    return createTheme(THEME_CODE_EDITOR_DEFAULT);
  }

  getBaseExtensions(): Extension[] {
    return [
      this.getCustomTheme(),
      this.basicLinter,
      lintGutter(),
      search(),
      keymap.of(defaultKeymap),
    ];
  }

  getLanguageExtension(language: string): Extension | null {
    const factory = this.languageExtensions[language.toLowerCase()];
    return factory ? factory() : null;
  }
}
