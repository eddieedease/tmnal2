import {
  Component, inject, signal, effect, ViewChild, ElementRef,
  AfterViewChecked, ChangeDetectionStrategy
} from '@angular/core';
import { TerminalService } from '../terminal.service';
import { ProfileService } from '../services/profile.service';
import { ProfileResult } from '../profile-result/profile-result';

@Component({
  selector: 'app-terminal',
  imports: [ProfileResult],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './terminal.html',
  styleUrl: './terminal.css',
})
export class Terminal implements AfterViewChecked {
  protected svc = inject(TerminalService);
  protected profile = inject(ProfileService);
  protected inputValue = signal('');
  protected history = signal<string[]>([]);
  protected historyIndex = signal(-1);

  @ViewChild('outputEl') private outputEl!: ElementRef<HTMLDivElement>;
  @ViewChild('inputEl') private inputEl!: ElementRef<HTMLInputElement>;
  @ViewChild('resultEl', { read: ElementRef }) private resultEl?: ElementRef<HTMLElement>;

  private _prevState = '';

  constructor() {
    effect(() => {
      if (!this.svc.isProcessing()) {
        setTimeout(() => this.inputEl?.nativeElement.focus());
      }
    });
  }

  ngAfterViewChecked(): void {
    const state = this.profile.state();
    if (state === 'done' && this._prevState !== 'done') {
      // Scroll so the result panel top is visible in the output container
      setTimeout(() => {
        const output = this.outputEl?.nativeElement;
        const result = this.resultEl?.nativeElement;
        if (output && result) {
          output.scrollTop = result.offsetTop - 12;
        }
      }, 150);
    } else if (state !== 'done') {
      this.scrollToBottom();
    }
    this._prevState = state;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submit();
    } else if (!this.profile.isActive() && event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateHistory(1);
    } else if (!this.profile.isActive() && event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigateHistory(-1);
    }
  }

  protected submit(): void {
    const val = this.inputValue();
    if (!val.trim()) return;
    if (!this.profile.isActive()) {
      this.history.update(h => [val, ...h]);
      this.historyIndex.set(-1);
    }
    this.svc.process(val);
    this.inputValue.set('');
  }

  private navigateHistory(direction: number): void {
    const h = this.history();
    const next = this.historyIndex() + direction;
    if (next < 0) {
      this.historyIndex.set(-1);
      this.inputValue.set('');
    } else if (next < h.length) {
      this.historyIndex.set(next);
      this.inputValue.set(h[next]);
    }
  }

  private scrollToBottom(): void {
    if (this.outputEl) {
      this.outputEl.nativeElement.scrollTop = this.outputEl.nativeElement.scrollHeight;
    }
  }

  focusInput(): void {
    this.inputEl?.nativeElement.focus();
  }
}
