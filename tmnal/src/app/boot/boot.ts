import {
  Component, input, output, OnInit, OnDestroy, signal, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.html',
  styleUrl: './boot.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Boot implements OnInit, OnDestroy {
  lines = input.required<string[]>();
  done = output<void>();

  protected visibleLines = signal<string[]>([]);
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.animateLines();
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private animateLines(): void {
    const all = this.lines();
    let i = 0;

    const step = () => {
      if (i >= all.length) {
        this.timer = setTimeout(() => this.done.emit(), 600);
        return;
      }
      this.visibleLines.update(v => [...v, all[i++]]);
      this.timer = setTimeout(step, 120);
    };

    this.timer = setTimeout(step, 300);
  }
}
