import { FadeIn } from './ui/FadeIn';
import { Button } from './ui/Button';

interface StatementProps {
  title: string;
  paragraphs: string[];
  ctaText?: string;
  ctaHref?: string;
  theme?: 'dark' | 'light' | 'orange';
}

export function Statement({ title, paragraphs, ctaText, ctaHref, theme = 'dark' }: StatementProps) {
  const themes = {
    dark: 'bg-aj-dark text-aj-light',
    light: 'bg-aj-white text-aj-dark border-y border-orange-50',
    orange: 'bg-aj-orange text-white',
  };

  const buttonVariants = {
    dark: 'primary' as const,
    light: 'dark' as const,
    orange: 'dark' as const,
  };
  
  const textThemes = {
    dark: 'text-aj-light/80',
    light: 'text-aj-gray',
    orange: 'text-white/90',
  }

  return (
    <section className={`py-24 md:py-32 ${themes[theme]}`}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-serif mb-8">
            {title}
          </h2>
        </FadeIn>
        <div className={`space-y-6 text-lg md:text-xl font-sans leading-relaxed ${textThemes[theme]}`}>
          {paragraphs.map((p, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <p dangerouslySetInnerHTML={{ __html: p }} />
            </FadeIn>
          ))}
        </div>
        {ctaText && ctaHref && (
          <FadeIn delay={0.4} className="mt-12 flex justify-center">
            <Button href={ctaHref} variant={buttonVariants[theme]}>
              {ctaText}
            </Button>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
