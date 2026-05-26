import { features } from '../../data/features'
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from '../ui/SectionReveal'

export function WhyUs() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionReveal className="mb-16 text-center md:mb-20">
          <p className="text-sm font-light text-cream-muted/60">
            Почему нас выбирают
          </p>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-light text-cream md:text-5xl">
            Ремесло, которому можно доверять
          </h2>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <StaggerItem key={feature.title}>
                <div
                  className="group h-full rounded-sm craft-border craft-border-hover bg-bg-secondary/30 p-8 transition-all duration-500 hover:bg-bg-secondary/50 glow-warm-hover"
                  data-cursor="hover"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm border border-cream/5 bg-bg-tertiary/50 transition-colors duration-500 group-hover:border-crust/25">
                    <Icon
                      size={20}
                      className="text-crust/70 transition-colors duration-500 group-hover:text-crust"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-display text-xl font-light text-cream">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-cream-muted/60">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
