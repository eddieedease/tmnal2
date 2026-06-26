import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-profile-result',
  templateUrl: './profile-result.html',
  styleUrl: './profile-result.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileResult {
  protected profile = inject(ProfileService);
  protected langSvc = inject(LanguageService);

  protected today(): string {
    const locale = this.langSvc.lang() === 'nl' ? 'nl-NL' : 'en-GB';
    return new Date().toLocaleDateString(locale, { day: '2-digit', month: 'long', year: 'numeric' });
  }

  protected hasOpenAnswers(open: Record<string, string>): boolean {
    return Object.values(open).some(v => v && v !== '(—)');
  }

  protected printPdf(): void {
    window.print();
  }
}
