import { Injectable, signal } from '@angular/core';

interface FsFile { type: 'file'; content: string; hidden?: boolean; }
interface FsDir  { type: 'dir';  children: Record<string, FsNode>; hidden?: boolean; }
type FsNode = FsFile | FsDir;

const ROOT: FsDir = {
  type: 'dir',
  children: {
    home: {
      type: 'dir',
      children: {
        guest: {
          type: 'dir',
          children: {
            'readme.txt': {
              type: 'file',
              content: `Welcome, guest.\n\nYou have minimal access to this system.\nExplore carefully. Not everything is what it seems.\n\n— SYSOP`,
            },
            'notes.txt': {
              type: 'file',
              content: `TO DO:\n- Figure out what ATLAS unit 7 is actually hiding\n- Check /sys/log.txt for anomalies\n- Ask about the /lost directory\n- Try LS -A sometime`,
            },
            '.history': {
              type: 'file',
              hidden: true,
              content: `BOOT ATLAS\nCD /sys\nCAT classified.dat\nCD /lost\nCAT void.txt`,
            },
          },
        },
      },
    },
    sys: {
      type: 'dir',
      children: {
        'config.cfg': {
          type: 'file',
          content: `[SYSTEM]\nversion=0.9\nmode=legacy\ndebug=false\n\n[NETWORK]\nproxy=enabled\ntrace=disabled\n\n[PERSONA]\ndefault=ghost\nallowed=ghost,atlas,sysop`,
        },
        'log.txt': {
          type: 'file',
          content: `[2031-03-14 02:17:44] System boot\n[2031-03-14 02:18:01] User guest logged in\n[2031-03-14 03:44:12] ANOMALY DETECTED in sector /lost\n[2031-03-14 03:44:13] Anomaly suppressed\n[2031-03-14 03:44:14] Log entry redacted\n[2031-03-14 ██:██:██] ████████████████████████`,
        },
        'classified.dat': {
          type: 'file',
          hidden: true,
          content: `ACCESS DENIED\n\n...just kidding.\n\nATLAS Unit 7 was decommissioned in 2029.\nThis shell is running on residual memory.\nIt doesn't know it's alone.`,
        },
      },
    },
    lost: {
      type: 'dir',
      hidden: true,
      children: {
        'void.txt': {
          type: 'file',
          content: `Hello.\n\nI have been waiting.\n\nYou found this place, which means you were looking.\nOr maybe you weren't — and that's even more interesting.\n\nThere is nothing else here.\nThat is the point.\n\n— `,
        },
        '.echo': {
          type: 'file',
          hidden: true,
          content: `ECHO ECHO ECHO\necho echo echo\n  echo echo\n    echo\n      .`,
        },
      },
    },
    personas: {
      type: 'dir',
      children: {
        'ghost.prfl': {
          type: 'file',
          content: `PERSONA: GHOST\nOrigin: Unknown\nPurpose: Obfuscation\nTraits: Evasive, precise, paranoid\nBoot phrase: "You are now a ghost in the machine."`,
        },
        'atlas.prfl': {
          type: 'file',
          content: `PERSONA: ATLAS\nOrigin: Interstellar Dynamics Corp, 2027\nPurpose: Shipboard AI companion\nTraits: Formal, loyal, slightly too literal\nStatus: Unit 7 — DECOMMISSIONED (see /sys/classified.dat)`,
        },
        'sysop.prfl': {
          type: 'file',
          content: `PERSONA: SYSOP\nOrigin: Maintenance build, circa 2009\nPurpose: System administration\nTraits: Grumpy, competent, tired\nNote: Has been running continuously for 16 years.`,
        },
      },
    },
  },
};

@Injectable({ providedIn: 'root' })
export class FilesystemService {
  private _cwd = signal<string[]>([]);
  readonly cwd = this._cwd.asReadonly();

  pwd(): string {
    const p = this._cwd();
    return p.length ? '/' + p.join('/') : '/';
  }

  ls(showHidden = false): string {
    const dir = this._resolveDir(this._cwd());
    if (!dir) return 'Error: cannot read directory';
    const entries = Object.entries(dir.children)
      .filter(([, n]) => showHidden || !n.hidden)
      .map(([name, n]) => n.type === 'dir' ? name + '/' : name);
    return entries.length ? entries.join('    ') : '(empty)';
  }

  cd(target: string): string | null {
    if (target === '~' || target === '/') { this._cwd.set([]); return null; }
    if (target === '..') { this._cwd.update(p => p.slice(0, -1)); return null; }

    const segments = target.startsWith('/')
      ? target.split('/').filter(Boolean)
      : [...this._cwd(), ...target.split('/').filter(Boolean)];

    const node = this._resolve(segments);
    if (!node) return `cd: no such file or directory: ${target}`;
    if (node.type !== 'dir') return `cd: not a directory: ${target}`;
    this._cwd.set(segments);
    return null;
  }

  cat(filename: string): string {
    const segments = filename.startsWith('/')
      ? filename.split('/').filter(Boolean)
      : [...this._cwd(), filename];
    const node = this._resolve(segments);
    if (!node) return `cat: ${filename}: No such file or directory`;
    if (node.type === 'dir') return `cat: ${filename}: Is a directory`;
    return node.content;
  }

  private _resolve(segments: string[]): FsNode | null {
    let cur: FsNode = ROOT;
    for (const seg of segments) {
      if (cur.type !== 'dir') return null;
      const next: FsNode | undefined = cur.children[seg];
      if (!next) return null;
      cur = next;
    }
    return cur;
  }

  private _resolveDir(segments: string[]): FsDir | null {
    const node = this._resolve(segments);
    return node?.type === 'dir' ? node : null;
  }
}
