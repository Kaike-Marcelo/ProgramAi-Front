import { inject, Injectable, signal } from '@angular/core';
import { GlotApiService } from '../../../services/glot-api.service';
import { LanguageService } from './language.service';
import { GlotRunResponseDto } from '../../../core/dtos/response/glot-run-response-dto.model';
import { ConsoleMessage } from '../../components/complex-components/console-output/console-output-types';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CodeExecutionService {
  #glotApi = inject(GlotApiService);
  #languageService = inject(LanguageService);

  consoleMessagesSignal = signal<ConsoleMessage[]>([]);
  consoleMessages = this.consoleMessagesSignal.asReadonly();

  isExecuting = signal<boolean>(false);
  lastExecutionResult = signal<GlotRunResponseDto | null>(null);

  private maxMessages = 100;

  addConsoleMessage(type: ConsoleMessage['type'], content: string) {
    this.consoleMessagesSignal.update(messages => {
      const newMessage: ConsoleMessage = {
        type,
        content,
        timestamp: new Date()
      };
      if (messages.length >= this.maxMessages) {
        return [...messages.slice(1), newMessage];
      }
      return [...messages, newMessage];
    });
  }

  clearConsole() {
    this.consoleMessagesSignal.set([]);
  }

  clearLastExecution(): void {
    this.lastExecutionResult.set(null);
  }

  async executeCode(language: string, code: string): Promise<GlotRunResponseDto | null> {
    this.clearLastExecution();

    if (!code?.trim()) {
      this.addConsoleMessage('error', 'Nenhum código para executar.');
      return null;
    }
    
    const apiLanguage = this.#languageService.getLanguageName(language);

    this.isExecuting.set(true);
    this.addConsoleMessage('command', `Executando código ${language.toUpperCase()}...`);

    try {
      const result = await lastValueFrom(this.#glotApi.runCode(apiLanguage, code));

      this.lastExecutionResult.set(result);
      this.processExecutionResult(result);

      return result;
    } catch (error: any) {
      this.addConsoleMessage('error', `Falha na execução: ${error.message}`);
      return null;

    } finally {
      this.isExecuting.set(false);
    }
  }

  private processExecutionResult(result: GlotRunResponseDto): void {
    if (result.stdout) {
      this.addConsoleMessage('stdout', result.stdout);
    }

    if (result.stderr) {
      this.addConsoleMessage('stderr', result.stderr);
    }

    if (result.error) {
      this.addConsoleMessage('error', `Erro de execução: ${result.error}`);
    }

    if (!result.stdout && !result.stderr && !result.error) {
      this.addConsoleMessage('info', 'Código executado com sucesso (sem saída).');
    }
  }
}
