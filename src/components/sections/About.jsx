import { SectionReveal } from '../ui/SectionReveal'

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <SectionReveal className="lg:col-span-4">
            <p className="text-sm font-light text-cream-muted/60">
              О бренде
            </p>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight text-cream md:text-5xl">
              Готовим так,{' '}
              <span className="italic text-amber-glow">как для своего стола</span>
            </h2>
          </SectionReveal>

          <SectionReveal className="lg:col-span-7 lg:col-start-6" delay={0.15}>
            <p className="text-lg font-light leading-[1.85] text-cream-muted/85 md:text-xl md:leading-[1.9]">
              Мы готовим небольшими партиями то, что хочется поставить в центр
              стола: домашние колбасы, выпечку, соусы, десерты и сезонные
              гастробоксы. Всё вручную, с вниманием к деталям и атмосферой
              настоящего домашнего застолья.
            </p>

            <div className="mt-14 grid grid-cols-2 gap-8 border-t border-cream/5 pt-12 md:grid-cols-3">
              {[
                { value: '01', label: 'Колбасы и колбаски своего посола' },
                { value: '02', label: 'Выпечка из живого теста' },
                { value: '03', label: 'Гастробоксы по предзаказу' },
              ].map((item) => (
                <div key={item.value}>
                  <span className="font-display text-sm text-crust/60">
                    {item.value}
                  </span>
                  <p className="mt-3 text-sm font-light leading-relaxed text-cream-muted/70">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
