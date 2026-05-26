import { useState, useCallback } from 'react'
import { Preloader } from '../components/layout/Preloader'
import { CustomCursor } from '../components/layout/CustomCursor'
import { GrainOverlay } from '../components/layout/GrainOverlay'
import { AmbientGlow } from '../components/layout/AmbientGlow'
import { MobileOrderBar } from '../components/layout/MobileOrderBar'
import { CartDrawer } from '../components/cart/CartDrawer'
import { CheckoutModal } from '../components/checkout/CheckoutModal'
import { QuestionButton } from '../components/question/QuestionButton'
import { Header } from '../components/sections/Header'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Products } from '../components/sections/Products'
import { Delivery } from '../components/sections/Delivery'
import { HowItWorks } from '../components/sections/HowItWorks'
import { WhyUs } from '../components/sections/WhyUs'
import { Gallery } from '../components/sections/Gallery'
import { Testimonials } from '../components/sections/Testimonials'
import { TrackOrderSection } from '../components/sections/TrackOrderSection'
import { ContactSection } from '../components/sections/ContactSection'
import { Footer } from '../components/sections/Footer'

export function HomePage() {
  const [loaded, setLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && <Preloader onComplete={handleLoadComplete} />}

      <CustomCursor />
      <GrainOverlay />
      <AmbientGlow />

      <div
        className={`relative z-10 transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header />
        <main>
          <Hero />
          <About />
          <Products />
          <Delivery />
          <HowItWorks />
          <WhyUs />
          <Gallery />
          <Testimonials />
          <TrackOrderSection />
          <ContactSection />
        </main>
        <Footer />
        <MobileOrderBar />
        <QuestionButton />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </>
  )
}
