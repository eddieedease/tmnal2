import { Injectable, inject, signal } from '@angular/core';
import { PersonaService } from './services/persona.service';
import { FilesystemService } from './services/filesystem.service';
import { ProfileService } from './services/profile.service';
import { LanguageService } from './services/language.service';

export interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'header' | 'question' | 'meta';
  text: string;
  id: number;
}

type InternalState = 'lang-select' | 'ready';

@Injectable({ providedIn: 'root' })
export class TerminalService {
  private persona = inject(PersonaService);
  private fs = inject(FilesystemService);
  private profile = inject(ProfileService);
  private langSvc = inject(LanguageService);

  private _lines = signal<TerminalLine[]>([]);
  private _isProcessing = signal(false);
  private _requestBoot = signal(0);
  private _counter = 0;
  private _internalState: InternalState = 'lang-select';

  readonly lines = this._lines.asReadonly();
  readonly isProcessing = this._isProcessing.asReadonly();
  readonly requestBoot = this._requestBoot.asReadonly();

  /** Called after boot animation — shows language selection first */
  startLanguageSelect(): void {
    this._lines.set([]);
    this._counter = 0;
    this._internalState = 'lang-select';
    const t = this.langSvc.t;
    this._addLines([
      { type: 'header', text: '══════════════════════════════════════' },
      { type: 'header', text: `  ${t.langSelectHeader}` },
      { type: 'header', text: '══════════════════════════════════════' },
      { type: 'output', text: '' },
      { type: 'question', text: t.langOption1 },
      { type: 'question', text: t.langOption2 },
      { type: 'output', text: '' },
      { type: 'meta', text: t.langSelectPrompt },
    ]);
  }

  /** Called after language is chosen (or on persona re-boot) */
  init(): void {
    this._internalState = 'ready';
    this._lines.set([]);
    this._counter = 0;
    const t = this.langSvc.t;
    this._addLines([
      { type: 'system', text: t.personaGreetings[this.persona.current().id] ?? this.persona.current().greeting },
      { type: 'system', text: t.startHint },
    ]);
  }

  process(input: string): void {
    const trimmed = input.trim();
    if (!trimmed) return;

    this._addLine({ type: 'input', text: `> ${trimmed}`, id: this._counter++ });
    this._isProcessing.set(true);

    if (this._internalState === 'lang-select') {
      setTimeout(() => {
        this._handleLangSelect(trimmed);
        this._isProcessing.set(false);
      }, 200);
      return;
    }

    const delay = this.profile.isActive() ? 120 : 300 + Math.random() * 400;
    setTimeout(() => {
      if (this.profile.isActive()) {
        this._handleProfile(trimmed);
      } else {
        const result = this._handle(trimmed);
        if (result === '__TYPED__') {
          // already done
        } else if (result === '__CLEAR__') {
          this._lines.set([]);
        } else if (result === '__BOOT__') {
          // handled by app via requestBoot signal
        } else if (result === '__PROFILE_START__') {
          for (const tl of this.profile.start(this.langSvc.t)) {
            this._addLine({ type: tl.type, text: tl.text, id: this._counter++ });
          }
        } else {
          for (const line of result.split('\n')) {
            this._addLine({ type: 'output', text: line, id: this._counter++ });
          }
        }
      }
      this._isProcessing.set(false);
    }, delay);
  }

  private _handleLangSelect(input: string): void {
    const t = this.langSvc.t;
    const v = input.trim().toUpperCase();
    if (v === '1' || v === 'EN' || v === 'ENGLISH') {
      this.langSvc.set('en');
    } else if (v === '2' || v === 'NL' || v === 'NEDERLANDS') {
      this.langSvc.set('nl');
    } else {
      this._addLines([
        { type: 'meta', text: t.langInvalid },
        { type: 'meta', text: t.langSelectPrompt },
      ]);
      return;
    }
    this._addLine({ type: 'meta', text: this.langSvc.t.langConfirmed, id: this._counter++ });
    setTimeout(() => this.init(), 400);
  }

  private _handle(input: string): string {
    const t = this.langSvc.t;
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toUpperCase();
    const arg = parts.slice(1).join(' ');
    const flag = parts[1]?.toUpperCase();

    switch (cmd) {
      case 'HELP':
        return [
          t.helpTitle,
          '──────────────────────────────────────',
          ...t.helpCommands,
          '',
          t.helpFS,
          ...t.helpFSCmds,
          '',
          t.helpPersonas,
          ...t.helpPersonasCmds,
          '',
          t.helpAssessment,
          ...t.helpAssessmentCmds,
        ].join('\n');

      case 'CLEAR':
        return '__CLEAR__';

      case 'DATE':
        return `${new Date().toISOString()}`;

      case 'WHOAMI':
        return t.whoamiResponse(this.persona.current().name, this.fs.pwd());

      case 'ECHO':
        return arg || '(nothing to echo)';

      case 'PWD':
        return this.fs.pwd();

      case 'LS': {
        return this.fs.ls(flag === '-A');
      }

      case 'CD': {
        const err = this.fs.cd(arg || '~');
        return err ?? this.fs.pwd();
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

      case 'START':
        return '__PROFILE_START__';

      default: {
        return this.persona.current().unknownResponse(input);
      }
    }
  }

  private _handleProfile(input: string): void {
    const { lines } = this.profile.submit(input, this.langSvc.t);
    for (const tl of lines) {
      this._addLine({ type: tl.type, text: tl.text, id: this._counter++ });
    }
  }

  private _addLine(line: TerminalLine): void {
    this._lines.update(prev => [...prev, line]);
  }

  private _addLines(items: Omit<TerminalLine, 'id'>[]): void {
    for (const item of items) {
      this._addLine({ ...item, id: this._counter++ });
    }
  }
}
