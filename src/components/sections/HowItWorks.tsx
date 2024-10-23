'use client'

import { Container } from "@/components/layout/Container"
import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowRight, Settings, Brain, LineChart } from "lucide-react"

interface StepCardProps {
  number: string
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
}

const StepCard = ({ number, title, description, icon, gradient }: StepCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`relative p-6 rounded-2xl backdrop-blur-sm ${gradient} border border-white/20 shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-2xl bg-white/10 dark:bg-black/10" />
      <div className="relative">
        <div className="flex items-center mb-4">
          <motion.div 
            className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-blue-600 shadow-inner"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <motion.div 
            className="ml-4 px-3 py-1 bg-white/20 dark:bg-gray-800/40 rounded-full text-sm font-medium"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            Passo {number}
          </motion.div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-white dark:text-white">{title}</h3>
        <p className="text-white/80 dark:text-gray-300">{description}</p>
        
        <motion.div
          className="mt-4 flex items-center text-white/90 text-sm font-medium"
          animate={{ x: isHovered ? 5 : 0 }}
        >
          Saiba mais <ArrowRight className="ml-2 w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  )
}

const steps = [
  {
    number: "1",
    title: "Configure seu Sistema",
    description: "Personalize horários, serviços e regras de agendamento de acordo com seu negócio.",
    icon: <Settings className="w-6 h-6" />,
    gradient: "bg-gradient-to-br from-blue-600 to-blue-400"
  },
  {
    number: "2",
    title: "IA em Ação",
    description: "Nossa IA gerencia automaticamente agendamentos e atendimento inicial dos clientes.",
    icon: <Brain className="w-6 h-6" />,
    gradient: "bg-gradient-to-br from-purple-600 to-blue-500"
  },
  {
    number: "3",
    title: "Gerencie e Optimize",
    description: "Acompanhe resultados pelo dashboard e aprimore sua operação com insights da IA.",
    icon: <LineChart className="w-6 h-6" />,
    gradient: "bg-gradient-to-br from-indigo-600 to-purple-500"
  }
] as const

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full py-24 md:py-32 lg:py-40 bg-gray-900 dark:bg-gray-900 overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-white/10 text-white rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            Processo Simplificado
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Três passos simples para revolucionar seu atendimento com IA
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          {/* Linha conectora entre os cards */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-indigo-500/50 hidden md:block" />
          
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </Container>
    </section>
  )
}