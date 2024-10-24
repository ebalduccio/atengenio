"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/Container"
import { motion } from "framer-motion"
import { BrainCircuitIcon, CalendarCheckIcon, MessageSquareIcon, SparklesIcon } from "@/components/icons"

export function Hero() {
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({
  //       x: e.clientX,
  //       y: e.clientY,
  //     })
  //   }

  //   window.addEventListener("mousemove", handleMouseMove)
  //   return () => window.removeEventListener("mousemove", handleMouseMove)
  // }, [])

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-gray-900 pt-20 md:pt-24 lg:pt-32 xl:pt-48">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover "
          style={{ filter: 'brightness(0.7)' }}
        >
          <source src="/videos/hero1.mp4" type="video/mp4" />
        </video>
        {/* Overlay para escurecer o vídeo e melhorar a legibilidade */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Background Pattern (mantido com opacidade reduzida) */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-blue-500/[0.01] [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-white/[0.01]" />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-blue-900/10"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
      </div> */}

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 text-blue-500/20 dark:text-blue-400/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BrainCircuitIcon size={120} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/4 text-blue-500/20 dark:text-blue-400/20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <CalendarCheckIcon size={100} />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/3 text-blue-500/20 dark:text-blue-400/20"
          animate={{
            x: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <MessageSquareIcon size={80} />
        </motion.div>
      </div>

      <Container className="relative z-10"> {/* Added z-10 to ensure content stays above video */}
        <div className="relative flex flex-col items-center space-y-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50/90 text-blue-600 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-900/80"
          >
            <SparklesIcon className="mr-1 h-4 w-4" />
            Potencialize seu negócio com IA
          </motion.div>

          {/* Main Content */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                Automatize seu
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400">
                Atendimento com IA
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-100 dark:text-gray-200"
            >
              Transforme seu negócio com um sistema inteligente de agendamento e atendimento.
              Reduza custos, aumente a satisfação dos clientes e gerencie tudo em um só lugar.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8"
              >
                Começar Agora
                <span className="ml-2">→</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 text-lg px-8"
              >
                Agendar Demo
              </Button>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8"
            >
              {[
                { metric: "10k+", label: "Usuários Ativos" },
                { metric: "98%", label: "Satisfação" },
                { metric: "24/7", label: "Suporte" },
              ].map((item) => (
                <div key={item.label} className="text-center mb-16">
                  <div className="text-3xl font-bold text-blue-400">{item.metric}</div>
                  <div className="text-sm text-gray-200 dark:text-gray-300">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80" />
    </section>
  )
}