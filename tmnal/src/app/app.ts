import {
  Component, inject, signal, computed, effect, OnInit, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';
import { Terminal } from './terminal/terminal';
import { Boot } from './boot/boot';
import { PersonaService } from './services/persona.service';
import { TerminalService } from './terminal.service';

type ScreenState = 'off' | 'booting' | 'on' | 'powering-off';

@Component({
  selector: 'app-root',
  imports: [Terminal, Boot],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy {
  protected persona = inject(PersonaService);
  private terminalSvc = inject(TerminalService);

  protected screenState = signal<ScreenState>('booting');
  protected currentTime = signal('');
  private timer: ReturnType<typeof setInterval> | null = null;

  protected themeStyle = computed(() => {
    const c = this.persona.current().colors;
    return `--t-primary:${c.primary};--t-dim:${c.dim};--t-bg:${c.bg};--t-border:${c.border}`;
  });

  protected bootLines = computed(() => this.persona.current().bootLines);

  constructor() {
    // When BOOT command fires in terminal, trigger re-boot sequence
    effect(() => {
      const n = this.terminalSvc.requestBoot();
      if (n > 0) this.screenState.set('booting');
    });
  }

  ngOnInit(): void {
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  protected onBootDone(): void {
    this.terminalSvc.init();
    this.screenState.set('on');
  }

  protected togglePower(): void {
    const state = this.screenState();
    if (state === 'off') {
      this.screenState.set('booting');
    } else if (state === 'on') {
      this.screenState.set('powering-off');
      setTimeout(() => this.screenState.set('off'), 700);
    }
  }

  protected get isPowered(): boolean {
    return this.screenState() !== 'off';
  }

  private tick(): void {
    this.currentTime.set(new Date().toLocaleTimeString('en-GB', { hour12: false }));
  }
}
