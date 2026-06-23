import {
  Component, inject, signal, effect, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy
} from '@angular/core';
import { TerminalService } from '../terminal.service';

@Component({
  selector: 'app-terminal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './terminal.html',
  styleUrl: './terminal.css',
})
export class Terminal implements AfterViewChecked {
  protected svc = inject(TerminalService);
  protected inputValue = signal('');
  protected history = signal<string[]>([]);
  protected historyIndex = signal(-1);

  @ViewChild('outputEl') private outputEl!: ElementRef<HTMLDivElement>;
  @ViewChild('inputEl') private inputEl!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      if (!this.svc.isProcessing()) {
        setTimeout(() => this.inputEl?.nativeElement.focus());
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submit();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateHistory(1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigateHistory(-1);
    }
  }

  protected submit(): void {
    const val = this.inputValue();
    if (!val.trim()) return;
    this.history.update(h => [val, ...h]);
    this.historyIndex.set(-1);
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
