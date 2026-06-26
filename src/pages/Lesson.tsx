import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Stars from '@/components/Stars';
import { getLesson, lessons } from '@/data/lessons';

const Lesson = () => {
  const { slug } = useParams();
  const lesson = getLesson(slug || '');
  const [rating, setRating] = useState(lesson?.rating ?? 0);

  if (!lesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
        <p className="font-display text-3xl uppercase">Урок не найден</p>
        <Link to="/" className="text-accent underline">На главную</Link>
      </div>
    );
  }

  const others = lessons.filter((l) => l.id !== lesson.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background paper-grain text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Armchair" size={26} className="text-accent" />
            <span className="font-display text-2xl font-bold uppercase tracking-tight">Стулоделие</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-sm uppercase tracking-widest transition-colors hover:text-accent"
          >
            <Icon name="ArrowLeft" size={18} /> К галерее
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-border">
        <div className="container grid items-center gap-10 py-14 md:grid-cols-2">
          <div className="animate-fade-up">
            <div className="mb-4 flex flex-wrap items-center gap-3 font-display text-xs uppercase tracking-widest">
              <span className="bg-accent px-3 py-1 text-accent-foreground">{lesson.level}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Icon name="Clock" size={14} /> {lesson.duration}
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
              {lesson.title}
            </h1>
            <p className="mt-5 max-w-md font-serif-craft text-xl italic text-muted-foreground">
              {lesson.intro}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Stars value={rating} onRate={setRating} size={22} />
              <span className="font-serif-craft text-lg text-muted-foreground">
                {rating.toFixed(1)} / 5
              </span>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -left-4 -top-4 h-full w-full border-2 border-accent" />
            <div className="group relative cursor-pointer overflow-hidden">
              <img
                src={lesson.img}
                alt={lesson.title}
                className="relative aspect-video w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 transition-colors group-hover:bg-foreground/40">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:scale-110">
                  <Icon name="Play" size={34} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container grid gap-12 py-16 md:grid-cols-3">
        {/* STEPS */}
        <div className="md:col-span-2">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">Пошаговый план</p>
          <h2 className="mb-8 font-display text-3xl font-bold uppercase md:text-4xl">Как собрать</h2>
          <ol className="space-y-6">
            {lesson.steps.map((step, idx) => (
              <li
                key={idx}
                className="flex gap-5 border-b border-border pb-6 animate-fade-up"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <span className="font-display text-4xl font-bold text-accent">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold uppercase">{step.title}</h3>
                  <p className="mt-1 font-serif-craft text-lg text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* TOOLS */}
        <aside className="md:sticky md:top-24 md:h-fit">
          <div className="border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon name="Wrench" size={22} className="text-accent" />
              <h3 className="font-display text-xl font-bold uppercase">Материалы и инструменты</h3>
            </div>
            <ul className="space-y-3">
              {lesson.tools.map((tool) => (
                <li key={tool} className="flex items-center gap-3 font-serif-craft text-lg">
                  <Icon name="Check" size={18} className="text-accent" />
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* OTHER LESSONS */}
      <section className="border-t border-border bg-secondary/40 py-16">
        <div className="container">
          <h2 className="mb-8 font-display text-3xl font-bold uppercase">Другие уроки</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((l) => (
              <Link
                key={l.id}
                to={`/urok/${l.slug}`}
                className="group block overflow-hidden border border-border bg-card transition-shadow hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={l.img}
                    alt={l.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 bg-background/90 px-3 py-1 font-display text-xs uppercase tracking-wider">
                    {l.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold uppercase leading-tight">{l.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Armchair" size={24} />
            <span className="font-display text-xl font-bold uppercase tracking-tight">Стулоделие</span>
          </Link>
          <p className="font-serif-craft text-lg italic">Мастерство в каждой детали</p>
        </div>
      </footer>
    </div>
  );
};

export default Lesson;
