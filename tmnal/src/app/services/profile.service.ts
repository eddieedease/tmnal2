import { Injectable, signal } from '@angular/core';
import { Translations } from '../i18n/translations';

// ── Role definitions ──────────────────────────────────────────────────────────

export type RoleKey = 'PL' | 'RI' | 'CO' | 'SH' | 'ME' | 'TW' | 'IMP' | 'CF' | 'SP';

export interface EasingRole {
  key: RoleKey;
  name: string;
  label: string;
  description: string;
  strengths: string[];
  allowable: string;
  teamValue: string;
}

export const ROLES: Record<RoleKey, EasingRole> = {
  PL:  { key: 'PL',  name: 'Plant',                label: 'THE PLANT',                description: 'Creative, imaginative and free-thinking. Generates ideas and solves difficult problems.', strengths: ['original thinking', 'creative problem-solving', 'unconventional approaches'], allowable: 'May ignore incidentals and be too preoccupied to communicate effectively.', teamValue: 'Brings breakthrough ideas when the team is stuck.' },
  RI:  { key: 'RI',  name: 'Resource Investigator', label: 'THE RESOURCE INVESTIGATOR', description: 'Enthusiastic and outgoing. Explores opportunities and develops contacts with natural ease.', strengths: ['networking', 'enthusiasm', 'opportunity recognition'], allowable: 'Can be over-optimistic and may lose interest once initial enthusiasm passes.', teamValue: 'Opens doors and keeps the team connected to the outside world.' },
  CO:  { key: 'CO',  name: 'Coordinator',           label: 'THE COORDINATOR',           description: 'Mature, confident, and clarifying. Identifies talent and clarifies goals with a steady hand.', strengths: ['delegation', 'goal-setting', 'bringing people together'], allowable: 'Can be seen as manipulative and might delegate personal work excessively.', teamValue: 'Holds the team together and ensures everyone contributes.' },
  SH:  { key: 'SH',  name: 'Shaper',               label: 'THE SHAPER',               description: 'Challenging and dynamic. Thrives under pressure and has the courage to overcome obstacles.', strengths: ['drive', 'directness', 'results focus'], allowable: "Can be prone to provocation and may upset people's feelings.", teamValue: 'Drives the team forward when energy or direction is lacking.' },
  ME:  { key: 'ME',  name: 'Monitor Evaluator',     label: 'THE MONITOR EVALUATOR',    description: 'Sober, strategic and discerning. Sees all options and judges accurately before committing.', strengths: ['critical thinking', 'objectivity', 'strategic judgment'], allowable: 'Can lack drive and ability to inspire others, and may be overly critical.', teamValue: 'Prevents costly mistakes by seeing what others miss.' },
  TW:  { key: 'TW',  name: 'Teamworker',            label: 'THE TEAMWORKER',           description: 'Cooperative, perceptive and diplomatic. Listens, builds, and averts friction with care.', strengths: ['diplomacy', 'listening', 'team harmony'], allowable: 'Can be indecisive in crunch situations and avoids confrontation.', teamValue: 'Keeps the team cohesive and morale high under stress.' },
  IMP: { key: 'IMP', name: 'Implementer',           label: 'THE IMPLEMENTER',          description: 'Disciplined, reliable and efficient. Turns ideas into practical actions and works systematically.', strengths: ['organisation', 'follow-through', 'reliability'], allowable: 'Can be somewhat inflexible and slow to respond to new possibilities.', teamValue: 'Gets things done — reliably and at scale.' },
  CF:  { key: 'CF',  name: 'Completer Finisher',    label: 'THE COMPLETER FINISHER',   description: 'Conscientious and painstaking. Searches for errors and ensures nothing is left incomplete.', strengths: ['attention to detail', 'quality control', 'follow-through on standards'], allowable: 'Can be inclined to worry unduly and reluctant to delegate.', teamValue: 'Ensures the final product meets the highest standard.' },
  SP:  { key: 'SP',  name: 'Specialist',            label: 'THE SPECIALIST',           description: 'Single-minded and self-starting. Provides rare knowledge and skills in a narrow field.', strengths: ['deep expertise', 'technical mastery', 'independent work'], allowable: 'Can contribute only on a narrow front and may dwell on technicalities.', teamValue: 'Brings indispensable knowledge the team cannot function without.' },
};

// ── Question structure (text driven by translations) ──────────────────────────

type QStep =
  | { type: 'likert'; role: RoleKey; idx: number }   // idx into t.likert[]
  | { type: 'open';   id: string;    idx: number };   // idx into t.open[]

const STEPS: QStep[] = [
  { type: 'likert', role: 'PL',  idx: 0  },
  { type: 'likert', role: 'RI',  idx: 1  },
  { type: 'likert', role: 'CO',  idx: 2  },
  { type: 'open',   id: 'A',     idx: 0  },
  { type: 'likert', role: 'SH',  idx: 3  },
  { type: 'likert', role: 'ME',  idx: 4  },
  { type: 'likert', role: 'TW',  idx: 5  },
  { type: 'open',   id: 'B',     idx: 1  },
  { type: 'likert', role: 'IMP', idx: 6  },
  { type: 'likert', role: 'CF',  idx: 7  },
  { type: 'likert', role: 'SP',  idx: 8  },
  { type: 'open',   id: 'C',     idx: 2  },
  { type: 'likert', role: 'PL',  idx: 9  },
  { type: 'likert', role: 'RI',  idx: 10 },
  { type: 'likert', role: 'CO',  idx: 11 },
  { type: 'open',   id: 'D',     idx: 3  },
  { type: 'likert', role: 'SH',  idx: 12 },
  { type: 'likert', role: 'ME',  idx: 13 },
  { type: 'likert', role: 'TW',  idx: 14 },
  { type: 'open',   id: 'E',     idx: 4  },
  { type: 'likert', role: 'IMP', idx: 15 },
  { type: 'likert', role: 'CF',  idx: 16 },
  { type: 'likert', role: 'SP',  idx: 17 },
];

// ── Typed line ────────────────────────────────────────────────────────────────

export type LineType = 'input' | 'output' | 'system' | 'header' | 'question' | 'meta';
export interface TypedLine { text: string; type: LineType; }

// ── Result ────────────────────────────────────────────────────────────────────

export interface RoleScore { role: EasingRole; score: number; pct: number; }

export interface ProfileResult {
  primary: RoleScore;
  secondary: RoleScore;
  all: RoleScore[];
  openAnswers: Record<string, string>;
}

// ── Service ───────────────────────────────────────────────────────────────────

type TestState = 'idle' | 'active' | 'done';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private _state = signal<TestState>('idle');
  private _step = 0;
  private _likertAnswers: Partial<Record<RoleKey, number[]>> = {};
  private _openAnswers: Record<string, string> = {};
  private _lastResult = signal<ProfileResult | null>(null);

  readonly state = this._state.asReadonly();
  readonly lastResult = this._lastResult.asReadonly();

  start(t: Translations): TypedLine[] {
    this._state.set('active');
    this._step = 0;
    this._likertAnswers = {};
    this._openAnswers = {};
    return [
      { type: 'header', text: '══════════════════════════════════════════════════════' },
      { type: 'header', text: `  ${t.assessHeader}` },
      { type: 'header', text: '══════════════════════════════════════════════════════' },
      { type: 'output', text: '' },
      { type: 'meta',   text: t.assessIntro1 },
      { type: 'meta',   text: t.assessIntro2 },
      { type: 'output', text: '' },
      { type: 'output', text: t.ratingLabel },
      ...t.ratingScale.map(s => ({ type: 'meta' as LineType, text: s })),
      { type: 'output', text: '' },
      { type: 'output', text: t.openQLabel },
      { type: 'meta',   text: t.cancelHint },
      { type: 'header', text: '══════════════════════════════════════════════════════' },
      { type: 'output', text: '' },
      ...this._currentPrompt(t),
    ];
  }

  submit(value: string, t: Translations): { lines: TypedLine[]; done: boolean } {
    if (value.trim().toUpperCase() === 'CANCEL') {
      this._state.set('idle');
      return { lines: [{ type: 'meta', text: t.cancelled }], done: false };
    }

    const step = STEPS[this._step];
    const lines: TypedLine[] = [];

    if (step.type === 'likert') {
      const n = parseInt(value.trim());
      if (isNaN(n) || n < 1 || n > 5) {
        return {
          lines: [
            { type: 'meta', text: '  1–5' },
            ...this._currentPrompt(t),
          ],
          done: false,
        };
      }
      const arr = this._likertAnswers[step.role] ?? [];
      arr.push(n);
      this._likertAnswers[step.role] = arr;
      lines.push({ type: 'meta', text: t.recordedFn(n) });
    } else {
      const text = value.trim() || '(—)';
      this._openAnswers[step.id] = text;
      lines.push({ type: 'meta', text: t.noted });
    }

    this._step++;
    const total = STEPS.length;
    const done = this._step >= total;

    if (done) {
      this._state.set('done');
      const result = this._computeResult();
      this._lastResult.set(result);
      return { lines: [...lines, { type: 'output', text: '' }, ...this._buildSummary(result, t)], done: true };
    }

    lines.push({ type: 'meta', text: t.progressFn(Math.round((this._step / total) * 100)) });
    lines.push({ type: 'output', text: '' });
    lines.push(...this._currentPrompt(t));
    return { lines, done: false };
  }

  isActive(): boolean { return this._state() === 'active'; }

  private _currentPrompt(t: Translations): TypedLine[] {
    const step = STEPS[this._step];
    const num = this._step + 1;
    const total = STEPS.length;

    if (step.type === 'likert') {
      return [
        { type: 'question', text: `  [${num}/${total}]  ${t.likert[step.idx]}` },
        { type: 'meta',     text: `  1–5:` },
      ];
    } else {
      const q = t.open[step.idx];
      return [
        { type: 'header',   text: `  ── OPEN [${num}/${total}]` },
        { type: 'question', text: `  ${q.text}` },
        { type: 'meta',     text: `  ${q.hint}` },
      ];
    }
  }

  private _computeResult(): ProfileResult {
    const roleScores: RoleScore[] = (Object.keys(ROLES) as RoleKey[]).map(key => {
      const answers = this._likertAnswers[key] ?? [];
      const score = answers.reduce((s, n) => s + n, 0);
      return { role: ROLES[key], score, pct: 0 };
    });
    const max = Math.max(...roleScores.map(r => r.score));
    roleScores.forEach(r => r.pct = max > 0 ? Math.round((r.score / max) * 100) : 0);
    roleScores.sort((a, b) => b.score - a.score);
    return { primary: roleScores[0], secondary: roleScores[1], all: roleScores, openAnswers: { ...this._openAnswers } };
  }

  private _buildSummary(r: ProfileResult, t: Translations): TypedLine[] {
    const { primary, secondary, openAnswers: open } = r;
    return [
      { type: 'header',   text: '╔══════════════════════════════════════════════════╗' },
      { type: 'header',   text: `║  ${t.resultComplete.padEnd(48)}║` },
      { type: 'header',   text: '╚══════════════════════════════════════════════════╝' },
      { type: 'output',   text: '' },
      { type: 'question', text: `  ${t.primaryRole}:    ${(t.roles[primary.role.key] ?? primary.role).label}` },
      { type: 'output',   text: `  ${t.secondaryRole}:  ${(t.roles[secondary.role.key] ?? secondary.role).label}` },
      { type: 'output',   text: '' },
      { type: 'output',   text: `  ${(t.roles[primary.role.key] ?? primary.role).description}` },
      { type: 'output',   text: '' },
      { type: 'meta',     text: `  ${t.coreStrengths}` },
      ...(t.roles[primary.role.key] ?? primary.role).strengths.map(s => ({ type: 'output' as LineType, text: `  • ${s}` })),
      { type: 'output',   text: '' },
      ...this._personalisedLines(primary, secondary, open, t),
      { type: 'header',   text: `  ${t.seeReport}` },
      { type: 'output',   text: '' },
    ];
  }

  private _personalisedLines(
    primary: RoleScore, secondary: RoleScore,
    open: Record<string, string>, t: Translations
  ): TypedLine[] {
    const out: TypedLine[] = [{ type: 'meta', text: `  ${t.personalisedNotes}` }];
    const labels = t.openLabels;

    const add = (key: string, labelIdx: number, noteFn: () => string) => {
      if (!open[key] || open[key] === '(—)') return;
      out.push(
        { type: 'meta',   text: `  ${labels[labelIdx]}:` },
        { type: 'output', text: `  "${open[key]}"` },
        { type: 'meta',   text: `  → ${noteFn()}` },
        { type: 'output', text: '' },
      );
    };

    const pk = primary.role.key;
    const sk = secondary.role.key;

    add('A', 0, () => t.envNotes[pk]);
    add('B', 1, () => {
      if (['SH', 'CO'].includes(pk)) return t.conflictDirect;
      if (['TW', 'IMP'].includes(pk)) return t.conflictAbsorb;
      if (['ME', 'CF'].includes(pk)) return t.conflictAnalytic;
      if (sk === 'TW') return t.conflictSecTW;
      return t.conflictDefault;
    });
    add('C', 2, () => t.energyNotes[pk]);
    add('D', 3, () => {
      if (['PL', 'RI'].includes(pk)) return t.startExploratory;
      if (['CO', 'TW'].includes(pk)) return t.startPeople;
      if (['SH', 'IMP'].includes(pk)) return t.startResults;
      if (['ME', 'CF'].includes(pk)) return t.startAnalysis;
      return t.startSpecialist;
    });
    add('E', 4, () => (t.contributionNotes[pk] ?? '') + t.contributionSuffix(t.roles[sk]?.name ?? ROLES[sk].name));

    return out;
  }
}
