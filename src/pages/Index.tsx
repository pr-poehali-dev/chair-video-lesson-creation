import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/bab22b06-88d2-400b-901c-67ab9bf5c821/files/1036472d-ea3b-42fa-985a-24f87d21fd81.jpg';
const CARVE_IMG = 'https://cdn.poehali.dev/projects/bab22b06-88d2-400b-901c-67ab9bf5c821/files/5e051b45-7f1b-4a98-b594-dddfab68b730.jpg';

interface RatedItem {
  id: number;
  title: string;
  meta: string;
  img: string;
  rating: number;
}

const initialLessons: RatedItem[] = [
  { id: 1, title: 'Венский стул из бука', meta: 'Видео урок · 42 мин', img: HERO_IMG, rating: 5 },
  { id: 2, title: 'Табурет на трёх ножках', meta: 'Видео урок · 28 мин', img: CARVE_IMG, rating: 4 },
  { id: 3, title: 'Кресло-качалка', meta: 'Видео урок · 1 ч 12 мин', img: HERO_IMG, rating: 5 },
  { id: 4, title: 'Барный стул с гнутой спинкой', meta: 'Видео урок · 55 мин', img: CARVE_IMG, rating: 4 },
];

const initialTips: RatedItem[] = [
  { id: 101, title: 'Как выбрать древесину для каркаса', meta: 'Совет · 5 мин чтения', img: CARVE_IMG, rating: 5 },
  { id: 102, title: 'Шиповое соединение без зазоров', meta: 'Совет · 7 мин чтения', img: HERO_IMG, rating: 5 },
  { id: 103, title: 'Финишное масло против лака', meta: 'Совет · 4 мин чтения', img: CARVE_IMG, rating: 4 },
];

function Stars({ value, onRate }: { value: number; onRate: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onRate(n)}
          className="transition-transform hover:scale-125"
          aria-label={`Оценить на ${n}`}
        >
          <Icon
            name="Star"
            size={18}
            className={
              (hover || value) >= n
                ? 'fill-accent text-accent'
                : 'text-muted-foreground/40'
            }
          />
        </button>
      ))}
    </div>
  );
}

const Index = () => {
  const [lessons, setLessons] = useState(initialLessons);
  const [tips, setTips] = useState(initialTips);

  const rate = (
    items: RatedItem[],
    setItems: (v: RatedItem[]) => void,
    id: number,
    n: number
  ) => setItems(items.map((i) => (i.id === id ? { ...i, rating: n } : i)));

  return (
    <div className="min-h-screen bg-background paper-grain text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2">
            <Icon name="Armchair" size={26} className="text-accent" />
            <span className="font-display text-2xl font-bold uppercase tracking-tight">
              Стулоделие
            </span>
          </a>
          <nav className="hidden gap-8 font-display text-sm uppercase tracking-widest md:flex">
            <a href="#gallery" className="transition-colors hover:text-accent">Галерея</a>
            <a href="#tips" className="transition-colors hover:text-accent">Советы</a>
            <a href="#about" className="transition-colors hover:text-accent">О мастерской</a>
          </nav>
          <button className="rounded-sm bg-primary px-5 py-2 font-display text-sm uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent">
            Подписаться
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative border-b border-border">
        <div className="container grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <div className="mb-5 flex items-center gap-3 font-display text-sm uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-10 bg-accent" /> Журнал столяра
            </div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] md:text-7xl">
              Стул как
              <br />
              <span className="text-stroke">произведение</span>
              <br />
              искусства
            </h1>
            <p className="mt-6 max-w-md font-serif-craft text-xl italic text-muted-foreground">
              Видео уроки, галерея авторских работ и проверенные советы — всё, чтобы
              собрать свой первый стул своими руками.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#gallery"
                className="flex items-center gap-2 rounded-sm bg-accent px-6 py-3 font-display text-sm uppercase tracking-wider text-accent-foreground transition-transform hover:scale-105"
              >
                <Icon name="Play" size={18} /> Смотреть уроки
              </a>
              <a
                href="#tips"
                className="flex items-center gap-2 rounded-sm border-2 border-foreground px-6 py-3 font-display text-sm uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
              >
                Читать советы
              </a>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -left-4 -top-4 h-full w-full border-2 border-accent" />
            <img
              src={HERO_IMG}
              alt="Деревянный стул в мастерской"
              className="relative aspect-square w-full object-cover grayscale-[15%]"
            />
            <div className="absolute -bottom-5 right-6 rotate-[-3deg] bg-primary px-5 py-3 font-display text-sm uppercase tracking-wider text-primary-foreground shadow-lg">
              ★ 4.9 рейтинг учеников
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="container py-20">
        <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">01 — Видео уроки</p>
            <h2 className="font-display text-4xl font-bold uppercase md:text-5xl">Галерея работ</h2>
          </div>
          <span className="hidden font-serif-craft text-lg italic text-muted-foreground md:block">
            Оцените каждый урок звёздами
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {lessons.map((item, idx) => (
            <article
              key={item.id}
              className="group animate-fade-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon name="Play" size={28} />
                  </div>
                </div>
                <span className="absolute left-3 top-3 bg-background/90 px-3 py-1 font-display text-xs uppercase tracking-wider">
                  {item.meta}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold uppercase leading-tight">{item.title}</h3>
              <div className="mt-3 flex items-center justify-between">
                <Stars value={item.rating} onRate={(n) => rate(lessons, setLessons, item.id, n)} />
                <span className="font-serif-craft text-lg text-muted-foreground">
                  {item.rating.toFixed(1)} / 5
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TIPS */}
      <section id="tips" className="border-y border-border bg-secondary/40 py-20">
        <div className="container">
          <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">02 — Статьи</p>
              <h2 className="font-display text-4xl font-bold uppercase md:text-5xl">Советы мастера</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tips.map((item, idx) => (
              <article
                key={item.id}
                className="group flex flex-col border border-border bg-card p-6 transition-shadow hover:shadow-xl animate-fade-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <Icon name="BookOpen" size={28} className="mb-4 text-accent" />
                <p className="font-display text-xs uppercase tracking-wider text-muted-foreground">{item.meta}</p>
                <h3 className="mt-2 flex-1 font-serif-craft text-2xl font-semibold leading-snug">{item.title}</h3>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <Stars value={item.rating} onRate={(n) => rate(tips, setTips, item.id, n)} />
                  <span className="font-serif-craft text-lg text-muted-foreground">{item.rating.toFixed(1)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container grid items-center gap-12 py-20 md:grid-cols-2">
        <div className="relative">
          <img src={CARVE_IMG} alt="Работа резцом" className="aspect-[4/5] w-full object-cover" />
          <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full border-2 border-accent" />
        </div>
        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">О мастерской</p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">
            Учим дереву<br />с любовью
          </h2>
          <p className="mt-6 font-serif-craft text-xl italic leading-relaxed text-muted-foreground">
            Каждый урок — это путь от грубой доски к изящному стулу. Мы снимаем подробные
            видео, делимся секретами соединений и помогаем новичкам не бояться инструмента.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { n: '120+', l: 'Видео уроков' },
              { n: '8 000', l: 'Учеников' },
              { n: '4.9', l: 'Средний рейтинг' },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-accent pl-3">
                <p className="font-display text-3xl font-bold">{s.n}</p>
                <p className="font-display text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
          <div className="flex items-center gap-2">
            <Icon name="Armchair" size={24} />
            <span className="font-display text-xl font-bold uppercase tracking-tight">Стулоделие</span>
          </div>
          <p className="font-serif-craft text-lg italic">Мастерство в каждой детали</p>
          <div className="flex gap-5">
            <Icon name="Youtube" size={22} className="cursor-pointer transition-transform hover:scale-110" />
            <Icon name="Instagram" size={22} className="cursor-pointer transition-transform hover:scale-110" />
            <Icon name="Send" size={22} className="cursor-pointer transition-transform hover:scale-110" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
