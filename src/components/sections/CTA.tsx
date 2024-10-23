'use client'

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/Container"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, MessageSquare, Bot } from "lucide-react"

function FeatureTag({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    >
      {children}
    </motion.div>
  )
}

export function CTA() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      </div>

      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center justify-center space-y-10 text-center">
          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            <FeatureTag>
              <Sparkles className="w-4 h-4 mr-1" />
              IA Avançada
            </FeatureTag>
            <FeatureTag>
              <Bot className="w-4 h-4 mr-1" />
              Chatbot 24/7
            </FeatureTag>
            <FeatureTag>
              <MessageSquare className="w-4 h-4 mr-1" />
              Multicanal
            </FeatureTag>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
            >
              Pronto para Revolucionar seu Atendimento?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-[600px] text-lg md:text-xl text-gray-600 dark:text-gray-300"
            >
              Junte-se a centenas de empresas que já transformaram seu atendimento com nossa solução inteligente.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Button 
              size="lg" 
              className="group bg-blue-600 hover:bg-blue-700 text-lg px-8"
            >
              Começar
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-lg px-8"
            >
              Falar com Consultor
              <MessageSquare className="w-4 h-4 ml-2 transition-transform group-hover:scale-110" />
            </Button>
          </motion.div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .bg-grid-black {
          background-size: 30px 30px;
          background-image: linear-gradient(to right, rgb(0 0 0 / 0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgb(0 0 0 / 0.1) 1px, transparent 1px);
        }
        .bg-grid-white {
          background-size: 30px 30px;
          background-image: linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgb(255 255 255 / 0.1) 1px, transparent 1px);
        }
      `}</style>
    </section>
  )
}