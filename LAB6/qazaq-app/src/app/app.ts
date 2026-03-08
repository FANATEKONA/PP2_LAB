import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

/** * МОДЕЛЬДЕР МЕН ДЕРЕКТЕР
 */
interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface ShadowingItem {
  text: string;
  translation: string;
}

const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    question: "«Сәлеметсіз бе!» сөзінің мағынасы қандай?",
    options: ["Сау болыңыз", "Амансыз ба (Сәлем)", "Рақмет", "Кешіріңіз"],
    correct: 1
  },
  {
    question: "Көптік жалғауы дұрыс жалғанған сөзді табыңыз:",
    options: ["Кітаптар", "Кітаптер", "Кітапдар", "Кітаптәр"],
    correct: 0
  },
  {
    question: "Бос орынды толтырыңыз: Мен қазақ тілін ...",
    options: ["үйреніп жүр", "үйреніп жүрсің", "үйреніп жүрмін", "үйреніп жүрміз"],
    correct: 3
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 font-sans text-slate-800">
      <!-- Навигация -->
      <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            <div class="flex items-center gap-2 cursor-pointer" (click)="setView('landing')">
              <div class="bg-indigo-600 p-2 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span class="font-bold text-xl tracking-tight text-indigo-900">QazaqTili</span>
            </div>

            @if (userLevel()) {
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1 text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full">
                  <span>🔥 {{ stats().streak }}</span>
                </div>
                <div class="bg-indigo-100 text-indigo-600 font-bold px-3 py-1 rounded-full cursor-pointer" (click)="setView('dashboard')">
                  {{ userLevel() }}
                </div>
              </div>
            }
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <!-- LANDING VIEW -->
        @if (currentView() === 'landing') {
          <div class="flex flex-col items-center justify-center py-12 space-y-16">
            <div class="text-center max-w-3xl space-y-6">
              <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Қазақ тілін <span class="text-indigo-600">жаңа деңгейде</span> үйрен!
              </h1>
              <p class="text-xl text-slate-600">
                Интерактивті сабақтар, shadowing техникасы және заманауи грамматика арқылы тілді тез әрі қызықты меңгеріңіз.
              </p>
              <button (click)="setView('diagnostic')" class="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-xl">
                Деңгейді анықтау →
              </button>
            </div>
          </div>
        }

        <!-- DIAGNOSTIC TEST VIEW -->
        @if (currentView() === 'diagnostic') {
          <div class="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 class="text-2xl font-bold mb-4">Диагностикалық тест</h2>
            <div class="w-full bg-slate-200 h-2 rounded-full mb-6">
              <div class="bg-emerald-500 h-2 rounded-full transition-all" [style.width.%]="(diagStep() / diagQuestions.length) * 100"></div>
            </div>

            <div class="space-y-6">
              <h3 class="text-xl font-semibold">{{ diagQuestions[diagStep()].question }}</h3>
              <div class="grid gap-3">
                @for (opt of diagQuestions[diagStep()].options; track $index) {
                  <button (click)="handleDiagAnswer($index)"
                    class="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition font-medium">
                    {{ opt }}
                  </button>
                }
              </div>
            </div>
          </div>
        }

        <!-- DASHBOARD VIEW -->
        @if (currentView() === 'dashboard') {
          <div class="space-y-8">
            <div class="bg-indigo-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
              <div class="flex items-center gap-6">
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border border-white/30 text-2xl font-bold">
                  {{ userLevel()?.charAt(0) }}
                </div>
                <div>
                  <h1 class="text-3xl font-bold">Сәлем, Үйренуші!</h1>
                  <p class="text-indigo-100">Деңгей: {{ userLevel() }}</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="bg-white/10 p-4 rounded-2xl border border-white/20 text-center min-w-[100px]">
                  <div class="text-2xl font-bold">🌟 {{ stats().points }}</div>
                  <div class="text-xs uppercase tracking-wider opacity-70">Ұпай</div>
                </div>
              </div>
            </div>

            <h2 class="text-2xl font-bold">Оқу бағдарламасы</h2>
            <div class="grid gap-4">
              @for (mod of modules; track $index) {
                <div class="p-6 rounded-2xl border-2 flex items-center justify-between bg-white"
                  [class.opacity-50]="mod.locked"
                  [class.border-emerald-100]="mod.completed"
                  [class.bg-emerald-50]="mod.completed">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                      [class.bg-emerald-500]="mod.completed" [class.text-white]="mod.completed"
                      [class.bg-indigo-100]="!mod.completed && !mod.locked">
                      {{ mod.completed ? '✓' : $index + 1 }}
                    </div>
                    <div>
                      <h3 class="font-bold text-lg">{{ mod.title }}</h3>
                      <p class="text-slate-500 text-sm">{{ mod.desc }}</p>
                    </div>
                  </div>
                  @if (!mod.locked && !mod.completed) {
                    <button (click)="setView('lesson')" class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700">Бастау</button>
                  }
                </div>
              }
            </div>
          </div>
        }

        <!-- LESSON VIEW -->
        @if (currentView() === 'lesson') {
          <div class="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">1-сабақ: Сәлемдесу</h2>
              <button (click)="setView('dashboard')" class="text-slate-400">Шығу</button>
            </div>

            <div class="flex space-x-2 bg-slate-100 p-1 rounded-xl mb-8">
              @for (tab of ['video', 'grammar', 'shadowing', 'practice']; track tab) {
                <button (click)="lessonTab.set(tab)"
                  class="flex-1 py-2 rounded-lg font-medium transition capitalize"
                  [class.bg-white]="lessonTab() === tab" [class.shadow-sm]="lessonTab() === tab"
                  [class.text-indigo-600]="lessonTab() === tab">
                  {{ tab }}
                </button>
              }
            </div>

            <!-- Tab Content -->
            <div class="min-h-[300px]">
              @if (lessonTab() === 'video') {
                <div class="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center">
                  <span class="text-white">Видео ойнатқыш (Placeholder)</span>
                </div>
              }

              @if (lessonTab() === 'grammar') {
                <div class="space-y-4">
                  <h3 class="text-xl font-bold">Жіктік жалғауы</h3>
                  <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    Қазақ тілінде баяндауыш бастауышқа үйлеседі. Мысалы: Мен студент+пін.
                  </div>
                </div>
              }

              @if (lessonTab() === 'shadowing') {
                <div class="flex flex-col items-center space-y-6">
                   <div class="text-center bg-slate-50 p-8 rounded-2xl w-full border border-slate-200">
                      <p class="text-3xl font-bold mb-2">{{ shadowingData[shadowIndex()].text }}</p>
                      <p class="text-slate-500 italic">{{ shadowingData[shadowIndex()].translation }}</p>
                   </div>
                   <button (click)="playAudio()" class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                      ▶
                   </button>
                   <div class="flex justify-between w-full">
                      <button (click)="prevShadow()" [disabled]="shadowIndex() === 0" class="px-4 py-2 border rounded">Артқа</button>
                      <span>{{ shadowIndex() + 1 }} / {{ shadowingData.length }}</span>
                      <button (click)="nextShadow()" class="px-4 py-2 bg-slate-800 text-white rounded">Келесі</button>
                   </div>
                </div>
              }

              @if (lessonTab() === 'practice') {
                <div class="space-y-6">
                  <h3 class="text-xl font-bold text-center">Бос орынды толтырыңыз</h3>
                  <p class="text-2xl text-center">Мен Алматы қаласынан келді__.</p>
                  <div class="grid grid-cols-2 gap-4">
                    @for (opt of ['м', 'мін', 'ң', 'сіз']; track opt; let i = $index) {
                      <button (click)="checkPractice(i)" class="p-4 border-2 rounded-xl hover:border-indigo-600 transition font-bold text-lg">
                        {{ opt }}
                      </button>
                    }
                  </div>
                  @if (practiceFinished()) {
                    <div class="bg-emerald-100 text-emerald-800 p-4 rounded-xl text-center font-bold animate-bounce">
                      Керемет! Сабақты аяқтадыңыз.
                      <button (click)="finishLesson()" class="block w-full mt-4 bg-emerald-600 text-white py-2 rounded">Дашбордқа оралу</button>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class App {
  // Күйді басқару (Signals)
  currentView = signal<'landing' | 'diagnostic' | 'dashboard' | 'lesson'>('landing');
  userLevel = signal<string | null>(null);
  stats = signal({ streak: 0, points: 0 });

  // Диагностика
  diagStep = signal(0);
  diagScore = signal(0);
  diagQuestions = DIAGNOSTIC_QUESTIONS;

  // Сабақ күйі
  lessonTab = signal('video');
  shadowIndex = signal(0);
  practiceFinished = signal(false);

  modules = [
    { title: "Сәлемдесу және танысу", desc: "Негізгі фразалар", locked: false, completed: false },
    { title: "Менің отбасым", desc: "Тәуелдік жалғауы", locked: true, completed: false },
    { title: "Дүкенде", desc: "Сан есімдер", locked: true, completed: false }
  ];

  shadowingData: ShadowingItem[] = [
    { text: "Сәлеметсіз бе! Менің атым Арман.", translation: "Hello! My name is Arman." },
    { text: "Танысқаныма өте қуаныштымын.", translation: "Glad to meet you." }
  ];

  setView(view: any) {
    this.currentView.set(view);
  }

  handleDiagAnswer(index: number) {
    if (index === this.diagQuestions[this.diagStep()].correct) {
      this.diagScore.update(s => s + 1);
    }

    if (this.diagStep() < this.diagQuestions.length - 1) {
      this.diagStep.update(s => s + 1);
    } else {
      const finalScore = this.diagScore();
      this.userLevel.set(finalScore >= 2 ? "A2 Жалғастырушы" : "A1 Бастауыш");
      this.stats.update(s => ({ ...s, points: 50, streak: 1 }));
      this.setView('dashboard');
    }
  }

  // Shadowing логикасы
  playAudio() {
    const text = this.shadowingData[this.shadowIndex()].text;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'kk-KZ';
    window.speechSynthesis.speak(utterance);
  }

  nextShadow() {
    if (this.shadowIndex() < this.shadowingData.length - 1) {
      this.shadowIndex.update(i => i + 1);
    } else {
      this.lessonTab.set('practice');
    }
  }

  prevShadow() {
    if (this.shadowIndex() > 0) {
      this.shadowIndex.update(i => i - 1);
    }
  }

  checkPractice(index: number) {
    if (index === 1) { // 'мін' is index 1
      this.practiceFinished.set(true);
    }
  }

  finishLesson() {
    this.stats.update(s => ({ ...s, points: s.points + 100 }));
    this.modules[0].completed = true;
    this.modules[1].locked = false;
    this.setView('dashboard');
    // Сброс сабақ күйі
    this.lessonTab.set('video');
    this.practiceFinished.set(false);
  }
}
