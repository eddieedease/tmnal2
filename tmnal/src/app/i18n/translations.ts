export type Lang = 'en' | 'nl';

export interface Translations {
  // Language selection
  langSelectHeader: string;
  langOption1: string;
  langOption2: string;
  langSelectPrompt: string;
  langInvalid: string;
  langConfirmed: string;

  // Terminal init
  startHint: string;
  personaGreetings: Record<string, string>;

  // Assessment
  assessHeader: string;
  assessIntro1: string;
  assessIntro2: string;
  ratingLabel: string;
  ratingScale: string[];
  openQLabel: string;
  openHint: string;
  cancelHint: string;
  recordedFn: (n: number) => string;
  progressFn: (pct: number) => string;
  noted: string;
  cancelled: string;

  // Likert questions (18)
  likert: string[];

  // Open questions (5)
  open: { text: string; hint: string }[];

  // Result panel
  resultHeader: string;
  resultComplete: string;
  primaryRole: string;
  secondaryRole: string;
  coreStrengths: string;
  teamValue: string;
  allowableWeakness: string;
  personalisedNotes: string;
  seeReport: string;
  roleDist: string;
  printBtn: string;
  comboPrefix: string;
  comboSuffix: string;
  openLabels: string[];

  // Note generators
  envNotes: Record<string, string>;
  energyNotes: Record<string, string>;
  conflictDirect: string;
  conflictAbsorb: string;
  conflictAnalytic: string;
  conflictSecTW: string;
  conflictDefault: string;
  startExploratory: string;
  startPeople: string;
  startResults: string;
  startAnalysis: string;
  startSpecialist: string;
  contributionNotes: Record<string, string>;
  contributionSuffix: (name: string) => string;
  comboPairs: Record<string, string>;
  comboDefault: (a: string, b: string) => string;

  // Help command
  helpTitle: string;
  helpCommands: string[];
  helpFS: string;
  helpFSCmds: string[];
  helpPersonas: string;
  helpPersonasCmds: string[];
  helpAssessment: string;
  helpAssessmentCmds: string[];

  // Role definitions (used in result panel)
  roles: Record<string, { name: string; label: string; description: string; strengths: string[]; allowable: string; teamValue: string; }>;

  // Misc command responses
  whoamiResponse: (persona: string, pwd: string) => string;
}

export const EN: Translations = {
  langSelectHeader: 'SELECT LANGUAGE',
  langOption1: '  🇬🇧  1  English',
  langOption2: '  🇳🇱  2  Nederlands',
  langSelectPrompt: '  Enter 1 or 2:',
  langInvalid: 'Invalid choice. Enter 1 for English or 2 for Nederlands.',
  langConfirmed: 'Language set to English.',

  personaGreetings: {
    ghost: 'Ghost protocol active. Leave no traces.',
    atlas: 'All systems nominal. Ready to receive orders, Commander.',
    sysop: "Fine. You're in. Don't touch anything I didn't say you could touch.",
  },

  startHint: 'Type START to begin your assessment, or HELP for all commands.',

  assessHeader: 'EASING PROFILE ASSESSMENT — INITIATED',
  assessIntro1: '  This assessment contains 18 rated statements and',
  assessIntro2: '  5 open questions. It takes approximately 5 minutes.',
  ratingLabel: '  For rated statements: enter a number from 1 to 5',
  ratingScale: [
    '    1 = Strongly disagree',
    '    2 = Disagree',
    '    3 = Neutral',
    '    4 = Agree',
    '    5 = Strongly agree',
  ],
  openQLabel: '  For open questions: type freely and press Enter.',
  openHint: '(free text — press Enter when done)',
  cancelHint: '  Type CANCEL at any time to abort.',
  recordedFn: (n) => `  Recorded: ${n}/5`,
  progressFn: (pct) => `  Progress: ${pct}%`,
  noted: '  Noted.',
  cancelled: 'Assessment cancelled.',

  likert: [
    'I enjoy coming up with original ideas that others have not considered.',
    'I am good at building networks and finding the right people to help.',
    'I naturally take the lead in organising group efforts toward a shared goal.',
    'I push hard to ensure goals are achieved, even when others want to slow down.',
    'I prefer to carefully analyse all options before committing to a decision.',
    'I am good at sensing tension in a group and helping to resolve it.',
    'I prefer structured, practical tasks over open-ended or ambiguous ones.',
    'I notice small errors and imperfections that others tend to overlook.',
    'I take pride in having deep expertise in a specific subject or field.',
    'I find conventional approaches limiting and prefer to think differently.',
    'I enjoy exploring new opportunities and get energised by new connections.',
    'I am skilled at recognising what each person in a team does best.',
    'I tend to be direct and challenge others when I think they are off track.',
    'I am rarely swept along by enthusiasm — I think critically before committing.',
    'I adapt easily to different people and adjust my style to suit the situation.',
    'I follow through on commitments reliably and systematically.',
    'I feel uncomfortable leaving things unfinished or below the expected standard.',
    'I prefer working in depth on one subject rather than spreading across many.',
  ],

  open: [
    { text: 'Briefly describe your ideal working environment.', hint: '(free text — press Enter when done)' },
    { text: 'Describe a time you had to work with a difficult colleague. How did you handle it?', hint: '(free text — press Enter when done)' },
    { text: 'What kind of work do you find most energising?', hint: '(free text — press Enter when done)' },
    { text: 'If you were starting a new project from scratch, what is the first thing you would do?', hint: '(free text — press Enter when done)' },
    { text: 'How do others typically describe your contribution to a team?', hint: '(free text — press Enter when done)' },
  ],

  resultHeader: 'EASING TEAM ROLE PROFILE',
  resultComplete: 'EASING PROFILE — COMPLETE',
  primaryRole: 'PRIMARY ROLE',
  secondaryRole: 'SECONDARY ROLE',
  coreStrengths: 'CORE STRENGTHS',
  teamValue: 'TEAM VALUE',
  allowableWeakness: 'ALLOWABLE WEAKNESS',
  personalisedNotes: 'PERSONALISED NOTES',
  seeReport: '── See the graphical report below ──',
  roleDist: 'ROLE DISTRIBUTION',
  printBtn: '▤   PRINT / DOWNLOAD PDF',
  comboPrefix: 'Together, ',
  comboSuffix: ' profiles suggest',
  openLabels: [
    'Ideal working environment',
    'Handling a difficult colleague',
    'Most energising work',
    'Starting a new project',
    'Team contribution (as others see it)',
  ],

  envNotes: {
    PL: 'spaces with creative freedom and minimal constraints.',
    RI: 'dynamic, social environments with room to explore.',
    CO: 'structured settings where collaboration is valued.',
    SH: 'high-pressure environments with clear outcomes.',
    ME: 'calm, analytical settings with access to information.',
    TW: 'harmonious teams where everyone feels heard.',
    IMP: 'organised systems with clear processes and roles.',
    CF: 'precise, quality-focused environments.',
    SP: 'deep, focused work in your area of expertise.',
  },
  energyNotes: {
    PL: 'Consistent with a Plant profile — original thinking is your fuel.',
    RI: 'Typical of a Resource Investigator — novelty and connection drive you.',
    CO: 'A Coordinator thrives when the whole team is moving together.',
    SH: 'Shapers are energised by challenge and momentum.',
    ME: 'Monitor Evaluators gain energy from clarity and reasoned decisions.',
    TW: 'Teamworkers are most alive when the group dynamic is healthy.',
    IMP: 'Implementers find deep satisfaction in tangible, completed work.',
    CF: 'Completer Finishers are energised when quality is upheld.',
    SP: 'Specialists thrive in depth — the more niche, the better.',
  },
  conflictDirect: 'Your directness and confidence typically help you address conflict head-on.',
  conflictAbsorb: 'Your tendency is to absorb tension and find common ground rather than escalate.',
  conflictAnalytic: 'You likely approach disagreement analytically — seeking facts over feelings.',
  conflictSecTW: 'Your secondary Teamworker instinct helps you navigate interpersonal friction diplomatically.',
  conflictDefault: 'Your approach to conflict reflects a balance between assertiveness and empathy.',
  startExploratory: 'This suggests an exploratory, generative first instinct — typical of creative and investigative roles.',
  startPeople: 'Starting with people and structure is a hallmark of relationship-oriented roles.',
  startResults: 'A results-first approach — jumping to action is a classic strength of driver profiles.',
  startAnalysis: 'Beginning with analysis or planning reflects your need for clarity before action.',
  startSpecialist: 'Your starting instinct reveals a Specialist tendency to assess the problem domain first.',
  contributionNotes: {
    PL: 'This aligns with how Plants are seen — the source of ideas others build on.',
    RI: 'Resource Investigators are typically seen as the connectors who open doors.',
    CO: 'Coordinators are often described exactly this way — the glue that holds teams together.',
    SH: 'Shapers are remembered as the ones who made things happen.',
    ME: 'Monitor Evaluators are valued for keeping teams from costly mistakes.',
    TW: 'This is the classic Teamworker reputation — the one people trust.',
    IMP: 'Implementers are the backbone others rely on to deliver.',
    CF: 'Completer Finishers are the reason the final product is excellent, not just good.',
    SP: 'Specialists are the indispensable expert the team turns to.',
  },
  contributionSuffix: (name) => ` A ${name} tendency adds further depth.`,
  comboPairs: {
    'PL-CO': 'a visionary who can also organise others around ideas.',
    'PL-RI': 'a creative explorer — generating and testing ideas with equal energy.',
    'PL-SH': 'a bold innovator who drives ideas through to reality.',
    'SH-IMP': 'a driven executor — setting direction and delivering results.',
    'CO-TW': 'a natural team leader who brings out the best in people.',
    'ME-CF': 'an exacting analyst — rigorous in judgment and meticulous in output.',
    'RI-CO': 'a networked leader who connects people and steers them purposefully.',
    'IMP-CF': 'a reliable finisher — structured, thorough, and dependable.',
    'SP-ME': 'a deep thinker — expert knowledge combined with critical judgment.',
  },
  comboDefault: (a, b) => `a distinctive blend of ${a} and ${b} qualities.`,

  helpTitle: 'AVAILABLE COMMANDS',
  helpCommands: [
    '  HELP              show this message',
    '  CLEAR             clear the screen',
    '  DATE              current timestamp',
    '  WHOAMI            your identity',
    '  ECHO <text>       echo text back',
  ],
  helpFS: 'FILESYSTEM',
  helpFSCmds: [
    '  PWD               print working directory',
    '  LS [-A]           list directory (use -A for hidden)',
    '  CD <path>         change directory  (.. / ~ supported)',
    '  CAT <file>        read file contents',
  ],
  helpPersonas: 'PERSONAS',
  helpPersonasCmds: [
    '  PERSONAS          list available personas',
    '  BOOT <name>       switch to persona: ghost | atlas | sysop',
  ],
  helpAssessment: 'ASSESSMENT',
  helpAssessmentCmds: [
    '  START             begin the Easing team role assessment',
  ],
  whoamiResponse: (persona, pwd) =>
    `Identity: GUEST\nPersona: ${persona}\nAccess level: STANDARD\nLocation: ${pwd}`,

  roles: {
    PL:  { name: 'Plant',                label: 'THE PLANT',                description: 'Creative, imaginative and free-thinking. Generates ideas and solves difficult problems.',                                                    strengths: ['original thinking', 'creative problem-solving', 'unconventional approaches'],    allowable: 'May ignore incidentals and be too preoccupied to communicate effectively.',                         teamValue: 'Brings breakthrough ideas when the team is stuck.' },
    RI:  { name: 'Resource Investigator', label: 'THE RESOURCE INVESTIGATOR', description: 'Enthusiastic and outgoing. Explores opportunities and develops contacts with natural ease.',                                                   strengths: ['networking', 'enthusiasm', 'opportunity recognition'],                            allowable: 'Can be over-optimistic and may lose interest once initial enthusiasm passes.',                      teamValue: 'Opens doors and keeps the team connected to the outside world.' },
    CO:  { name: 'Coordinator',           label: 'THE COORDINATOR',           description: 'Mature, confident, and clarifying. Identifies talent and clarifies goals with a steady hand.',                                                  strengths: ['delegation', 'goal-setting', 'bringing people together'],                         allowable: 'Can be seen as manipulative and might delegate personal work excessively.',                         teamValue: 'Holds the team together and ensures everyone contributes.' },
    SH:  { name: 'Shaper',               label: 'THE SHAPER',               description: 'Challenging and dynamic. Thrives under pressure and has the courage to overcome obstacles.',                                                   strengths: ['drive', 'directness', 'results focus'],                                           allowable: "Can be prone to provocation and may upset people's feelings.",                                       teamValue: 'Drives the team forward when energy or direction is lacking.' },
    ME:  { name: 'Monitor Evaluator',     label: 'THE MONITOR EVALUATOR',    description: 'Sober, strategic and discerning. Sees all options and judges accurately before committing.',                                                   strengths: ['critical thinking', 'objectivity', 'strategic judgment'],                         allowable: 'Can lack drive and ability to inspire others, and may be overly critical.',                         teamValue: 'Prevents costly mistakes by seeing what others miss.' },
    TW:  { name: 'Teamworker',            label: 'THE TEAMWORKER',           description: 'Cooperative, perceptive and diplomatic. Listens, builds, and averts friction with care.',                                                      strengths: ['diplomacy', 'listening', 'team harmony'],                                         allowable: 'Can be indecisive in crunch situations and avoids confrontation.',                                  teamValue: 'Keeps the team cohesive and morale high under stress.' },
    IMP: { name: 'Implementer',           label: 'THE IMPLEMENTER',          description: 'Disciplined, reliable and efficient. Turns ideas into practical actions and works systematically.',                                             strengths: ['organisation', 'follow-through', 'reliability'],                                  allowable: 'Can be somewhat inflexible and slow to respond to new possibilities.',                              teamValue: 'Gets things done — reliably and at scale.' },
    CF:  { name: 'Completer Finisher',    label: 'THE COMPLETER FINISHER',   description: 'Conscientious and painstaking. Searches for errors and ensures nothing is left incomplete.',                                                   strengths: ['attention to detail', 'quality control', 'follow-through on standards'],          allowable: 'Can be inclined to worry unduly and reluctant to delegate.',                                        teamValue: 'Ensures the final product meets the highest standard.' },
    SP:  { name: 'Specialist',            label: 'THE SPECIALIST',           description: 'Single-minded and self-starting. Provides rare knowledge and skills in a narrow field.',                                                        strengths: ['deep expertise', 'technical mastery', 'independent work'],                        allowable: 'Can contribute only on a narrow front and may dwell on technicalities.',                            teamValue: 'Brings indispensable knowledge the team cannot function without.' },
  },
};

export const NL: Translations = {
  langSelectHeader: 'KIES TAAL',
  langOption1: '  🇬🇧  1  English',
  langOption2: '  🇳🇱  2  Nederlands',
  langSelectPrompt: '  Voer 1 of 2 in:',
  langInvalid: 'Ongeldige keuze. Voer 1 in voor English of 2 voor Nederlands.',
  langConfirmed: 'Taal ingesteld op Nederlands.',

  personaGreetings: {
    ghost: 'Ghost-protocol actief. Laat geen sporen achter.',
    atlas: 'Alle systemen nominaal. Klaar om orders te ontvangen, Commandant.',
    sysop: 'Goed dan. Je bent binnen. Raak niets aan dat ik je niet heb gezegd te mogen aanraken.',
  },

  startHint: 'Typ START om de assessment te starten, of HELP voor alle commando\'s.',

  assessHeader: 'EASING PROFIEL ASSESSMENT — GESTART',
  assessIntro1: '  Deze assessment bevat 18 beoordelingsvragen en',
  assessIntro2: '  5 open vragen. Het duurt ongeveer 5 minuten.',
  ratingLabel: '  Voor beoordelingsvragen: voer een cijfer in van 1 tot 5',
  ratingScale: [
    '    1 = Zeer mee oneens',
    '    2 = Mee oneens',
    '    3 = Neutraal',
    '    4 = Mee eens',
    '    5 = Zeer mee eens',
  ],
  openQLabel: '  Voor open vragen: typ vrij en druk op Enter.',
  openHint: '(vrije tekst — druk op Enter als je klaar bent)',
  cancelHint: '  Typ CANCEL om te stoppen.',
  recordedFn: (n) => `  Geregistreerd: ${n}/5`,
  progressFn: (pct) => `  Voortgang: ${pct}%`,
  noted: '  Genoteerd.',
  cancelled: 'Assessment geannuleerd.',

  likert: [
    'Ik geniet ervan om originele ideeën te bedenken die anderen niet hebben overwogen.',
    'Ik ben goed in netwerken en het vinden van de juiste mensen om te helpen.',
    'Ik neem van nature de leiding bij het organiseren van groepsinspanningen naar een gemeenschappelijk doel.',
    'Ik zet me er hard voor in om doelen te bereiken, ook als anderen willen vertragen.',
    'Ik ga liever alle opties zorgvuldig analyseren voordat ik een beslissing neem.',
    'Ik ben goed in het aanvoelen van spanningen in een groep en het helpen oplossen ervan.',
    'Ik geef de voorkeur aan gestructureerde, praktische taken boven open of onduidelijke opdrachten.',
    'Ik merk kleine fouten en onvolkomenheden op die anderen over het hoofd zien.',
    'Ik ben trots op het hebben van diepgaande expertise op een specifiek vakgebied.',
    'Ik vind conventionele benaderingen beperkend en denk liever anders.',
    'Ik geniet van het verkennen van nieuwe mogelijkheden en word energiek van nieuwe contacten.',
    'Ik ben goed in het herkennen van waar elk teamlid het beste in is.',
    'Ik ben direct en daag anderen uit wanneer ik denk dat ze op het verkeerde spoor zitten.',
    'Ik laat me zelden meeslepen door enthousiasme — ik denk kritisch na voordat ik ergens aan begin.',
    'Ik pas me gemakkelijk aan aan verschillende mensen en pas mijn stijl aan de situatie aan.',
    'Ik kom mijn toezeggingen betrouwbaar en systematisch na.',
    'Ik voel me ongemakkelijk als dingen onafgemaakt blijven of onder de verwachte standaard blijven.',
    'Ik werk liever diepgaand aan één onderwerp dan verspreid over meerdere gebieden.',
  ],

  open: [
    { text: 'Omschrijf kort jouw ideale werkomgeving.', hint: '(vrije tekst — druk op Enter als je klaar bent)' },
    { text: 'Beschrijf een moment waarop je met een moeilijke collega moest werken. Hoe pakte je dat aan?', hint: '(vrije tekst — druk op Enter als je klaar bent)' },
    { text: 'Wat voor werk vind je het meest energiegevend?', hint: '(vrije tekst — druk op Enter als je klaar bent)' },
    { text: 'Als je een nieuw project van de grond af zou beginnen, wat is het eerste dat je doet?', hint: '(vrije tekst — druk op Enter als je klaar bent)' },
    { text: 'Hoe omschrijven anderen jouw bijdrage aan een team?', hint: '(vrije tekst — druk op Enter als je klaar bent)' },
  ],

  resultHeader: 'EASING TEAMROL PROFIEL',
  resultComplete: 'EASING PROFIEL — VOLTOOID',
  primaryRole: 'PRIMAIRE ROL',
  secondaryRole: 'SECUNDAIRE ROL',
  coreStrengths: 'KERNKWALITEITEN',
  teamValue: 'TEAMWAARDE',
  allowableWeakness: 'TOELAATBARE ZWAKTE',
  personalisedNotes: 'PERSOONLIJKE NOTITIES',
  seeReport: '── Zie het grafisch rapport hieronder ──',
  roleDist: 'ROLVERDELING',
  printBtn: '▤   AFDRUKKEN / PDF DOWNLOADEN',
  comboPrefix: 'Samen suggereren ',
  comboSuffix: ' profielen',
  openLabels: [
    'Ideale werkomgeving',
    'Omgaan met een moeilijke collega',
    'Meest energiegevend werk',
    'Een nieuw project starten',
    'Teambijdrage (zoals anderen het zien)',
  ],

  envNotes: {
    PL: 'ruimtes met creatieve vrijheid en minimale beperkingen.',
    RI: 'dynamische, sociale omgevingen met ruimte om te verkennen.',
    CO: 'gestructureerde omgevingen waar samenwerking centraal staat.',
    SH: 'omgevingen met hoge druk en duidelijke resultaten.',
    ME: 'rustige, analytische omgevingen met toegang tot informatie.',
    TW: 'harmonieuze teams waar iedereen gehoord wordt.',
    IMP: 'georganiseerde systemen met duidelijke processen en rollen.',
    CF: 'nauwkeurige, kwaliteitsgerichte omgevingen.',
    SP: 'diepgaand, gefocust werk in jouw vakgebied.',
  },
  energyNotes: {
    PL: 'Consistent met een Plant-profiel — origineel denken is jouw brandstof.',
    RI: 'Typisch voor een Resource Investigator — nieuwheid en contact drijven je aan.',
    CO: 'Een Coordinator gedijt wanneer het hele team samenwerkt.',
    SH: 'Shapers worden energiek van uitdagingen en vaart.',
    ME: 'Monitor Evaluators halen energie uit helderheid en weloverwogen beslissingen.',
    TW: 'Teamworkers zijn op hun best wanneer de groepsdynamiek gezond is.',
    IMP: 'Implementers vinden diepe voldoening in tastbaar, voltooid werk.',
    CF: 'Completer Finishers worden energiek wanneer kwaliteit gewaarborgd wordt.',
    SP: 'Specialists gedijen in diepgang — hoe nicher, hoe beter.',
  },
  conflictDirect: 'Jouw directheid en zelfvertrouwen helpen je conflicten direct aan te pakken.',
  conflictAbsorb: 'Jouw neiging is om spanning op te vangen en gemeenschappelijke grond te vinden.',
  conflictAnalytic: 'Je benadert onenigheid waarschijnlijk analytisch — feiten boven gevoel.',
  conflictSecTW: 'Jouw secundaire Teamworker-instinct helpt je om interpersoonlijke wrijving diplomatiek te navigeren.',
  conflictDefault: 'Jouw benadering van conflict weerspiegelt een balans tussen assertiviteit en empathie.',
  startExploratory: 'Dit wijst op een verkennnend, generatief eerste instinct — typisch voor creatieve en onderzoekende rollen.',
  startPeople: 'Starten met mensen en structuur is een kenmerk van relatiegericht rollen.',
  startResults: 'Een resultaatgerichte aanpak — direct in actie komen is een klassieke kracht van aandrijvende profielen.',
  startAnalysis: 'Beginnen met analyse of planning weerspiegelt jouw behoefte aan duidelijkheid voor actie.',
  startSpecialist: 'Jouw eerste instinct onthult een Specialist-neiging om eerst het probleemdomein te verkennen.',
  contributionNotes: {
    PL: 'Dit sluit aan bij hoe Plants worden gezien — de bron van ideeën waarop anderen voortbouwen.',
    RI: 'Resource Investigators worden doorgaans gezien als de verbinders die deuren openen.',
    CO: 'Coordinators worden vaak precies zo omschreven — de lijm die teams bij elkaar houdt.',
    SH: 'Shapers worden herinnerd als degenen die dingen voor elkaar kregen.',
    ME: 'Monitor Evaluators worden gewaardeerd om het voorkomen van kostbare fouten.',
    TW: 'Dit is de klassieke Teamworker-reputatie — degene op wie mensen vertrouwen.',
    IMP: 'Implementers zijn het ruggengraat waarop anderen steunen om te leveren.',
    CF: 'Completer Finishers zijn de reden dat het eindproduct uitstekend is, niet alleen goed.',
    SP: 'Specialists zijn de onmisbare expert tot wie het team zich wendt.',
  },
  contributionSuffix: (name) => ` Een ${name}-neiging voegt verdere diepte toe.`,
  comboPairs: {
    'PL-CO': 'een visionair die anderen ook rond ideeën kan organiseren.',
    'PL-RI': 'een creatieve ontdekker — ideeën genereren en testen met gelijke energie.',
    'PL-SH': 'een gedurfde innovator die ideeën naar de realiteit drijft.',
    'SH-IMP': 'een gedreven uitvoerder — richting bepalen en resultaten leveren.',
    'CO-TW': 'een natuurlijke teamleider die het beste in mensen naar boven brengt.',
    'ME-CF': 'een veeleisende analist — streng in oordeel en nauwkeurig in output.',
    'RI-CO': 'een goed genetwerkte leider die mensen verbindt en doelgericht stuurt.',
    'IMP-CF': 'een betrouwbare afmaker — gestructureerd, grondig en betrouwbaar.',
    'SP-ME': 'een diep denker — vakkennis gecombineerd met kritisch oordeel.',
  },
  comboDefault: (a, b) => `een unieke mix van ${a} en ${b} kwaliteiten.`,

  helpTitle: 'BESCHIKBARE COMMANDO\'S',
  helpCommands: [
    '  HELP              toon dit bericht',
    '  CLEAR             scherm leegmaken',
    '  DATE              huidige tijdstempel',
    '  WHOAMI            jouw identiteit',
    '  ECHO <tekst>      tekst teruggeven',
  ],
  helpFS: 'BESTANDSSYSTEEM',
  helpFSCmds: [
    '  PWD               huidige map tonen',
    '  LS [-A]           map weergeven (gebruik -A voor verborgen)',
    '  CD <pad>          map wisselen  (.. / ~ ondersteund)',
    '  CAT <bestand>     bestandsinhoud lezen',
  ],
  helpPersonas: "PERSONA'S",
  helpPersonasCmds: [
    "  PERSONAS          beschikbare persona's tonen",
    "  BOOT <naam>       wissel naar persona: ghost | atlas | sysop",
  ],
  helpAssessment: 'ASSESSMENT',
  helpAssessmentCmds: [
    '  START             begin de Easing teamrol assessment',
  ],
  whoamiResponse: (persona, pwd) =>
    `Identiteit: GAST\nPersona: ${persona}\nToegangssniveau: STANDAARD\nLocatie: ${pwd}`,

  roles: {
    PL:  { name: 'Bedenker',     label: 'DE BEDENKER',      description: 'Creatief, fantasierijk en vrij denkend. Genereert ideeën en lost moeilijke problemen op.',                                                    strengths: ['origineel denken', 'creatief probleemoplossen', 'onconventionele benaderingen'],  allowable: 'Kan bijzaken negeren en te zeer in beslag genomen zijn om effectief te communiceren.',  teamValue: 'Brengt doorbraakideeën wanneer het team vastzit.' },
    RI:  { name: 'Verkenner',    label: 'DE VERKENNER',     description: 'Enthousiast en extravert. Onderzoekt kansen en ontwikkelt contacten met natuurlijk gemak.',                                                    strengths: ['netwerken', 'enthousiasme', 'kansen herkennen'],                                  allowable: 'Kan te optimistisch zijn en interesse verliezen zodra het eerste enthousiasme wegvalt.', teamValue: 'Opent deuren en houdt het team verbonden met de buitenwereld.' },
    CO:  { name: 'Coördinator',  label: 'DE COÖRDINATOR',   description: 'Volwassen, zelfverzekerd en verduidelijkend. Identificeert talent en verduidelijkt doelen met een vaste hand.',                              strengths: ['delegeren', 'doelen stellen', 'mensen bijeenbrengen'],                            allowable: 'Kan als manipulatief worden gezien en delegeert mogelijk te veel persoonlijk werk.',     teamValue: 'Houdt het team bij elkaar en zorgt dat iedereen bijdraagt.' },
    SH:  { name: 'Vormer',       label: 'DE VORMER',        description: 'Uitdagend en dynamisch. Gedijt onder druk en heeft de moed om obstakels te overwinnen.',                                                      strengths: ['drive', 'directheid', 'resultaatgerichtheid'],                                    allowable: 'Kan gevoelig zijn voor provocatie en gevoelens van anderen kwetsen.',                   teamValue: 'Drijft het team vooruit wanneer energie of richting ontbreekt.' },
    ME:  { name: 'Waarderaar',   label: 'DE WAARDERAAR',    description: 'Nuchter, strategisch en onderscheidend. Ziet alle opties en beoordeelt nauwkeurig voor hij zich vastlegt.',                                  strengths: ['kritisch denken', 'objectiviteit', 'strategisch oordelen'],                       allowable: 'Kan drive missen en anderen moeilijk inspireren, en kan overmatig kritisch zijn.',      teamValue: 'Voorkomt kostbare fouten door te zien wat anderen missen.' },
    TW:  { name: 'Groepswerker', label: 'DE GROEPSWERKER',  description: 'Coöperatief, opmerkzaam en diplomatiek. Luistert, bouwt en vermijdt wrijving met zorg.',                                                     strengths: ['diplomatie', 'luisteren', 'teamharmonie'],                                        allowable: 'Kan besluiteloos zijn in crisismomenten en vermijdt confrontatie.',                     teamValue: 'Houdt het team hecht en het moraal hoog onder druk.' },
    IMP: { name: 'Uitvoerder',   label: 'DE UITVOERDER',    description: 'Gedisciplineerd, betrouwbaar en efficiënt. Vertaalt ideeën naar praktische acties en werkt systematisch.',                                   strengths: ['organisatie', 'doorzettingsvermogen', 'betrouwbaarheid'],                         allowable: 'Kan enigszins onbuigzaam zijn en langzaam reageren op nieuwe mogelijkheden.',           teamValue: 'Krijgt dingen gedaan — betrouwbaar en op schaal.' },
    CF:  { name: 'Afmaker',      label: 'DE AFMAKER',       description: 'Consciëntieus en nauwgezet. Zoekt naar fouten en zorgt dat niets onafgemaakt blijft.',                                                        strengths: ['oog voor detail', 'kwaliteitscontrole', 'naleving van normen'],                   allowable: 'Kan geneigd zijn onnodig te piekeren en is terughoudend in delegeren.',                teamValue: 'Zorgt dat het eindproduct aan de hoogste standaard voldoet.' },
    SP:  { name: 'Specialist',   label: 'DE SPECIALIST',    description: 'Doelgericht en zelfstartend. Biedt zeldzame kennis en vaardigheden op een smal gebied.',                                                      strengths: ['diepgaande expertise', 'technische beheersing', 'zelfstandig werken'],            allowable: 'Kan alleen op een smal vlak bijdragen en dwalen in technische details.',               teamValue: 'Brengt onmisbare kennis die het team niet zonder kan.' },
  },
};

export const TRANSLATIONS: Record<Lang, Translations> = { en: EN, nl: NL };
