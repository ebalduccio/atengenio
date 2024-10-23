import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/sections/CTA";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-1 pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}