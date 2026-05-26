import { steps } from '../../data/steps'
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from '../ui/SectionReveal'

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionReveal className="mb-16 text-center md:mb-20">
          <p className="text-sm font-light text-cream-muted/60">
            Как это работает
          </p>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-light text-cream md:text-5xl">
            От выбора до готового стола — четыре простых шага
          </h2>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="group relative h-full rounded-sm craft-border bg-bg-secondary/30 p-7 transition-all duration-500 hover:bg-bg-secondary/50 glow-warm-hover">
                <span className="font-display text-3xl font-light text-crust/40 transition-colors duration-500 group-hover:text-crust/60">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-xl font-light text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-cream-muted/60">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
