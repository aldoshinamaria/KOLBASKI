import { useProducts } from '../../context/ProductsContext'
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from '../ui/SectionReveal'
import { ProductCard } from '../products/ProductCard'

export function Products() {
  const { availableProducts } = useProducts()

  return (
    <section id="products" className="relative py-24 md:py-32 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionReveal className="mb-16 md:mb-20">
          <p className="text-sm font-light text-cream-muted/60">
            Гастробоксы
          </p>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-xl font-display text-4xl font-light text-cream md:text-5xl">
              Готовый стол в одной коробке
            </h2>
            <p className="max-w-sm text-sm font-light leading-relaxed text-cream-muted/60">
              Выберите бокс, добавьте в корзину и оформите предзаказ — мы
              соберём всё вручную.
            </p>
          </div>
        </SectionReveal>

        {availableProducts.length === 0 ? (
          <SectionReveal>
            <p className="text-center text-sm font-light text-cream-muted/50">
              Сейчас нет доступных гастробоксов. Загляните позже или задайте
              вопрос — мы подскажем.
            </p>
          </SectionReveal>
        ) : (
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {availableProducts.map((product, index) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  )
}
