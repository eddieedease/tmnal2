import { Injectable, signal } from '@angular/core';

export interface Persona {
  id: string;
  name: string;
  label: string;
  colors: { primary: string; dim: string; bg: string; border: string; };
  bootLines: string[];
  greeting: string;
  unknownResponse: (input: string) => string;
}

export const PERSONAS: Record<string, Persona> = {
  ghost: {
    id: 'ghost',
    name: 'GHOST',
    label: 'GHOST-OS v2.1  |  UNAUTHORIZED ACCESS TERMINAL',
    colors: {
      primary: '#00ff41',
      dim: '#00aa2b',
      bg: '#0a0f0a',
      border: '#00ff4122',
    },
    bootLines: [
      'GHOST-OS v2.1 INITIALIZING...',
      'Bypassing security layer ............... [OK]',
      'Injecting phantom process .............. [OK]',
      'Routing through proxy chain ............ [OK]',
      'Scrubbing identity markers ............. [OK]',
      'Trace protection: ACTIVE',
      '',
      '> You are now a ghost in the machine.',
    ],
    greeting: 'Ghost protocol active. Leave no traces.',
    unknownResponse: (i) => `Unknown vector: "${i}". Run HELP to enumerate attack surface.`,
  },

  atlas: {
    id: 'atlas',
    name: 'ATLAS',
    label: 'ATLAS SHIPBOARD COMPUTER  |  UNIT 7',
    colors: {
      primary: '#ffb000',
      dim: '#cc8800',
      bg: '#0f0b00',
      border: '#ffb00022',
    },
    bootLines: [
      'ATLAS SHIPBOARD COMPUTER — UNIT 7',
      'Running diagnostics...',
      '  Reactor core .......................... NOMINAL',
      '  Life support systems .................. ONLINE',
      '  Navigation array ...................... CALIBRATED',
      '  Crew manifest ......................... 1 personnel',
      '',
      'Welcome aboard, Commander.',
    ],
    greeting: 'All systems nominal. Ready to receive orders, Commander.',
    unknownResponse: (i) => `Command not found in database: "${i}". Consult ship manual or type HELP.`,
  },

  sysop: {
    id: 'sysop',
    name: 'SYSOP',
    label: 'SYSOP SHELL v0.9  |  LEGACY SYSTEM',
    colors: {
      primary: '#d4d4d4',
      dim: '#888888',
      bg: '#080808',
      border: '#ffffff15',
    },
    bootLines: [
      'SYSOP SHELL v0.9',
      'WARNING: deprecated kernel in use',
      'WARNING: 3 unresolved dependencies',
      'WARNING: last backup was 847 days ago',
      '',
      "Look. It works. That's all I promised.",
      'Login: guest  [access: minimal]',
    ],
    greeting: "Fine. You're in. Don't touch anything I didn't say you could touch.",
    unknownResponse: (i) => `"${i}"? Never heard of it. Type HELP. And yes, I know the docs are bad.`,
  },
};

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private _current = signal<Persona>(PERSONAS['ghost']);
  readonly current = this._current.asReadonly();
  readonly all = Object.values(PERSONAS);

  boot(id: string): Persona | null {
    const p = PERSONAS[id.toLowerCase()];
    if (!p) return null;
    this._current.set(p);
    return p;
  }
}
