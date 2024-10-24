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
    SmartphoneIcon,
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="group relative h-full">
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient}`} />

                <div className="relative flex flex-col h-full p-6 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300">
                    {/* Icon Container */}
                    <div className="mb-4">
                        <div className="relative inline-block">
                            <div className={`absolute inset-0 rounded-xl ${gradient} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                            <div className="relative p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group-hover:border-blue-500/50 dark:group-hover:border-blue-500/50 transition-colors">
                                {icon}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

const features = [
    {
        icon: <CalendarCheckIcon className="h-6 w-6 text-blue-600" />,
        title: "Agendamento Automático",
        description: "Sistema inteligente que permite seus clientes agendarem consultas 24/7 sem intervenção manual.",
        gradient: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
        icon: <BrainCircuitIcon className="h-6 w-6 text-indigo-600" />,
        title: "Atendimento com IA",
        description: "Chatbot inteligente que responde dúvidas, faz triagem e direciona clientes automaticamente.",
        gradient: "bg-gradient-to-r from-indigo-500 to-purple-500"
    },
    {
        icon: <SmartphoneIcon className="h-6 w-6 text-violet-600" />,
        title: "Apps iOS e Android",
        description: "Aplicativos nativos para iOS e Android permitindo agendamentos e gestão completa pelo celular.",
        gradient: "bg-gradient-to-r from-violet-500 to-purple-500"
    },
    {
        icon: <LayoutDashboardIcon className="h-6 w-6 text-purple-600" />,
        title: "Dashboard Completo",
        description: "Visualize e gerencie todos os agendamentos, clientes e métricas em um só lugar.",
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
        icon: <MessageSquareIcon className="h-6 w-6 text-pink-600" />,
        title: "Chat Multicanal",
        description: "Integração com WhatsApp e sites para atendimento unificado.",
        gradient: "bg-gradient-to-r from-pink-500 to-rose-500"
    },
    {
        icon: <UsersIcon className="h-6 w-6 text-rose-600" />,
        title: "Gestão de Clientes",
        description: "CRM integrado para acompanhar histórico e comportamento dos clientes.",
        gradient: "bg-gradient-to-r from-rose-500 to-orange-500"
    },
    {
        icon: <LineChartIcon className="h-6 w-6 text-orange-600" />,
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
                {/* Gradient Circles */}
                <div className="absolute right-0 top-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
                <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
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

                    {/* Features Grid with Phone Mockup */}
                    <div className="relative lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                        {/* Features Cards */}
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <FeatureCard
                                    {...features[2]}
                                    index={2}
                                />
                            </div>
                            {features.filter((_, index) => index !== 2).map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    {...feature}
                                    index={index > 2 ? index + 1 : index}
                                />
                            ))}
                        </div>

                        {/* Phone Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative mt-16 lg:mt-0"
                        >
                            <div className="relative">
                                {/* Floating Elements Around Phone */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-xl"
                                />
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl"
                                />
                                
                                {/* Phone Frame */}
                                <div className="relative z-10 transform lg:scale-110 lg:translate-x-12">
                                    <img 
                                        src="/images/mockup.png" 
                                        alt="App mockup" 
                                        className="w-full h-auto"
                                    />
                                    {/* Screen Reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 rounded-[inherit]" />
                                </div>
                            </div>

                            {/* Interactive Elements */}
                            <motion.div
                                animate={{ 
                                    boxShadow: [
                                        "0 0 0 0 rgba(59, 130, 246, 0)",
                                        "0 0 0 20px rgba(59, 130, 246, 0.1)",
                                        "0 0 0 0 rgba(59, 130, 246, 0)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-3xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    )
}