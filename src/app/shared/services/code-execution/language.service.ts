import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly languageMapping: Record<string, string> = {
    'javascript': 'javascript',
    'typescript': 'typescript',
    'python': 'python',
    'java': 'java',
    'csharp': 'csharp',
    'c': 'c',
    'cpp': 'cpp',
    'go': 'go',
    'rust': 'rust',
    'ruby': 'ruby',
    'php': 'php'
  };

  getFileName(language: string): string {
    const fileNames: Record<string, string> = {
      'c': 'main.c',
      'cpp': 'main.cpp',
      'java': 'Main.java',
      'python': 'main.py',
      'javascript': 'main.js',
      'typescript': 'main.ts',
      'csharp': 'main.cs',
      'go': 'main.go',
      'rust': 'main.rs',
      'ruby': 'main.rb',
      'php': 'main.php'
    };
    return fileNames[language] || 'main';
  }

  getLanguageName(languageKey: string): string {
    const mapped = this.languageMapping[languageKey.toLowerCase()];
    if (!mapped) {
      return 'javascript';
    }
    return mapped;
  }
}
