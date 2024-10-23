"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/layout/Container"
import {
    CalendarCheckIcon,
    BrainCircuitIcon,
    LayoutDashboardIcon,
    MessageSquareIcon,
    UsersIcon,
    LineChartIcon,
} from "@/components/icons"

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
    index: number
    gradient: string
}

function FeatureCard({ icon, title, description, index, gradient }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="group relative h-full">
                {/* Gradient Background */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient}`} />

                <div className="relative flex flex-col h-full p-8 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300">
                    {/* Icon Container */}
                    <div className="mb-6">
                        <div className="relative inline-block">
                            <div className={`absolute inset-0 rounded-xl ${gradient} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                            <div className="relative p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group-hover:border-blue-500/50 dark:group-hover:border-blue-500/50 transition-colors">
                                {icon}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

const features = [
    {
        icon: <CalendarCheckIcon className="h-8 w-8 text-blue-600" />,
        title: "Agendamento Automático",
        description: "Sistema inteligente que permite seus clientes agendarem consultas 24/7 sem intervenção manual.",
        gradient: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
        icon: <BrainCircuitIcon className="h-8 w-8 text-indigo-600" />,
        title: "Atendimento com IA",
        description: "Chatbot inteligente que responde dúvidas, faz triagem e direciona clientes automaticamente.",
        gradient: "bg-gradient-to-r from-indigo-500 to-purple-500"
    },
    {
        icon: <LayoutDashboardIcon className="h-8 w-8 text-purple-600" />,
        title: "Dashboard Completo",
        description: "Visualize e gerencie todos os agendamentos, clientes e métricas em um só lugar.",
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
        icon: <MessageSquareIcon className="h-8 w-8 text-pink-600" />,
        title: "Chat Multicanal",
        description: "Integração com WhatsApp e sites para atendimento unificado.",
        gradient: "bg-gradient-to-r from-pink-500 to-rose-500"
    },
    {
        icon: <UsersIcon className="h-8 w-8 text-rose-600" />,
        title: "Gestão de Clientes",
        description: "CRM integrado para acompanhar histórico e comportamento dos clientes.",
        gradient: "bg-gradient-to-r from-rose-500 to-orange-500"
    },
    {
        icon: <LineChartIcon className="h-8 w-8 text-orange-600" />,
        title: "Análises e Relatórios",
        description: "Métricas detalhadas sobre agendamentos, satisfação e desempenho do atendimento.",
        gradient: "bg-gradient-to-r from-orange-500 to-amber-500"
    }
] as const

export function Features() {
    return (
        <section id="features" className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-full bg-grid-blue-500/[0.02] [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-white/[0.02]" />
            </div>

            <Container>
                <div className="relative">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                            Recursos Poderosos
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            Todas as ferramentas que você precisa para automatizar seu atendimento e
                            escalar seu negócio com inteligência artificial.
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                {...feature}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}