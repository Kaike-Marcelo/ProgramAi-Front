import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Extension } from '@codemirror/state';
import { CodeEditor } from '@acrodata/code-editor';
import { CodeEditorService } from '../../../services/code-execution/code-editor.service';
import { LanguageDescription } from '@codemirror/language';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-editor',
  imports: [CodeEditor, FormsModule],
  standalone: true,
  templateUrl: './code-editor.html',
})
export class CodeEditorComponent {
  @Input() code: string = '';
  @Input() language: string = '';
  @Input() readonly: boolean = false;
  @Input() autoFocus: boolean = false;

  @Output() codeChange = new EventEmitter<string>();

  #editorService = inject(CodeEditorService);

  extensions: Extension[] = [];
  languageDescriptions: LanguageDescription[] = [];

  ngOnInit(): void {
    this.languageDescriptions = this.#editorService.getLanguageDescriptions();
    this.setupExtensions();
  }

  private setupExtensions() {
    const baseExtensions = this.#editorService.getBaseExtensions();
    const langExt = this.#editorService.getLanguageExtension(this.language);

    this.extensions = [
      ...baseExtensions,
      ...(langExt ? [langExt] : []),
    ];
  }
}
