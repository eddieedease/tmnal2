import { Injectable, inject, signal } from '@angular/core';
import { PersonaService, PERSONAS } from './services/persona.service';
import { FilesystemService } from './services/filesystem.service';

export interface TerminalLine {
  type: 'input' | 'output' | 'system';
  text: string;
  id: number;
}

const CONVERSATIONAL: [RegExp, () => string][] = [
  [/^(hello|hi|hey)\b/i,       () => 'Hello, user. Connection established.'],
  [/how are you/i,              () => 'All systems nominal. Ready to process your requests.'],
  [/what.*your name|who are you/i, () => 'I am TMNAL — Terminal Machine Natural Artificial Language interface.'],
  [/\b(bye|goodbye)\b/i,       () => 'Session termination acknowledged. Goodbye.'],
  [/thank/i,                   () => 'Acknowledged. Standing by.'],
  [/weather/i,                 () => 'Unable to reach weather satellite. Check your antenna array.'],
  [/joke/i,                    () => 'Why do programmers prefer dark mode? Because light attracts bugs.'],
  [/meaning of life/i,         () => 'Processing... 42. Query resolved.'],
  [/\btime\b/i,                () => `System clock: ${new Date().toLocaleTimeString()}`],
];

@Injectable({ providedIn: 'root' })
export class TerminalService {
  private persona = inject(PersonaService);
  private fs = inject(FilesystemService);

  private _lines = signal<TerminalLine[]>([]);
  private _isProcessing = signal(false);
  private _requestBoot = signal(0);
  private _counter = 0;

  readonly lines = this._lines.asReadonly();
  readonly isProcessing = this._isProcessing.asReadonly();
  readonly requestBoot = this._requestBoot.asReadonly();

  init(): void {
    this._lines.set([]);
    this._counter = 0;
    const greeting = this.persona.current().greeting;
    this._addLine({ type: 'system', text: greeting, id: this._counter++ });
    this._addLine({ type: 'system', text: `Type HELP for available commands.  PWD: ${this.fs.pwd()}`, id: this._counter++ });
  }

  process(input: string): void {
    const trimmed = input.trim();
    if (!trimmed) return;

    this._addLine({ type: 'input', text: `> ${trimmed}`, id: this._counter++ });
    this._isProcessing.set(true);

    const delay = 300 + Math.random() * 400;
    setTimeout(() => {
      const result = this._handle(trimmed);

      if (result === '__CLEAR__') {
        this._lines.set([]);
      } else if (result === '__BOOT__') {
        // handled by app
      } else {
        for (const line of result.split('\n')) {
          this._addLine({ type: 'output', text: line, id: this._counter++ });
        }
      }
      this._isProcessing.set(false);
    }, delay);
  }

  private _addLine(line: TerminalLine): void {
    this._lines.update(prev => [...prev, line]);
  }

  private _handle(input: string): string {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toUpperCase();
    const arg = parts.slice(1).join(' ');
    const flag = parts[1]?.toUpperCase();

    switch (cmd) {
      case 'HELP':
        return [
          'AVAILABLE COMMANDS',
          '──────────────────────────────────────',
          '  HELP              show this message',
          '  CLEAR             clear the screen',
          '  DATE              current timestamp',
          '  WHOAMI            your identity',
          '  ECHO <text>       echo text back',
          '',
          'FILESYSTEM',
          '  PWD               print working directory',
          `  LS [-A]           list directory (use -A for hidden)`,
          '  CD <path>         change directory  (.. / ~ supported)',
          '  CAT <file>        read file contents',
          '',
          'PERSONAS',
          '  PERSONAS          list available personas',
          '  BOOT <name>       switch to persona: ghost | atlas | sysop',
        ].join('\n');

      case 'CLEAR':
        return '__CLEAR__';

      case 'DATE':
        return `Current timestamp: ${new Date().toISOString()}`;

      case 'WHOAMI':
        return `Identity: GUEST\nPersona: ${this.persona.current().name}\nAccess level: STANDARD\nLocation: ${this.fs.pwd()}`;

      case 'ECHO':
        return arg || '(nothing to echo)';

      case 'PWD':
        return this.fs.pwd();

      case 'LS': {
        const showHidden = flag === '-A';
        return this.fs.ls(showHidden);
      }

      case 'CD': {
        const err = this.fs.cd(arg || '~');
        return err ?? `${this.fs.pwd()}`;
      }

      case 'CAT': {
        if (!arg) return 'cat: missing filename';
        return this.fs.cat(arg);
      }

      case 'PERSONAS':
        return [
          'AVAILABLE PERSONAS',
          '──────────────────────────────────────',
          ...this.persona.all.map(p => `  ${p.name.padEnd(10)} — ${p.label}`),
          '',
          'Use BOOT <name> to switch.',
        ].join('\n');

      case 'BOOT': {
        if (!arg) return 'Usage: BOOT <persona>  (ghost | atlas | sysop)';
        const p = this.persona.boot(arg);
        if (!p) return `Unknown persona: "${arg}". Try: ghost | atlas | sysop`;
        this._requestBoot.update(n => n + 1);
        return '__BOOT__';
      }

      default: {
        for (const [pattern, reply] of CONVERSATIONAL) {
          if (pattern.test(input)) return reply();
        }
        return this.persona.current().unknownResponse(input);
      }
    }
  }
}
