"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { BrainCircuitIcon } from "@/components/icons"
import { Container } from "./Container"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const menuItems = [
    {
        href: "#features",
        label: "Recursos",
        description: "Conheça todas as funcionalidades"
    },
    {
        href: "#how-it-works",
        label: "Como Funciona",
        description: "Veja como podemos te ajudar"
    },
    {
        href: "#pricing",
        label: "Planos",
        description: "Escolha o melhor para você"
    }
] as const

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        // Bloqueia o scroll quando o menu mobile está aberto
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    return (
        <header
            className={`fixed w-full transition-all duration-300 z-50 ${isScrolled || isMobileMenuOpen
                ? 'bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-sm'
                : 'bg-transparent dark:bg-transparent'
                }`}
        >
            <Container>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 shrink-0 z-50"
                    >
                        <div className="relative w-10 h-10">
                            <motion.div
                                animate={{ rotate: isMobileMenuOpen ? 360 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center"
                            >
                                <BrainCircuitIcon className="h-6 w-6 text-blue-600" />
                            </motion.div>
                        </div>
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                            AtenGênio
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {[
                            { href: "#features", label: "Recursos" },
                            { href: "#how-it-works", label: "Como Funciona" },
                            { href: "#pricing", label: "Planos" }
                        ].map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg group"
                            >
                                {label}
                                <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                        <div className="flex items-center space-x-2 ml-4">
                            <Link href={'#pricing'}>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Começar
                                </Button>
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        initial={false}
                        animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                        className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <motion.div
                            animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
                            className="absolute h-0.5 w-5 bg-current transform transition-transform"
                            style={{ translateY: isMobileMenuOpen ? 0 : -6 }}
                        />
                        <motion.div
                            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                            className="absolute h-0.5 w-5 bg-current"
                        />
                        <motion.div
                            animate={{ rotate: isMobileMenuOpen ? -45 : 0 }}
                            className="absolute h-0.5 w-5 bg-current transform transition-transform"
                            style={{ translateY: isMobileMenuOpen ? 0 : 6 }}
                        />
                    </motion.button>
                </div>

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-gray-950/20 backdrop-blur-sm z-40"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />

                            {/* Menu Content */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-[64px] left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 px-4 shadow-xl z-40"
                            >
                                <nav className="grid gap-y-6">
                                    {menuItems.map((item) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        {item.label}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {item.description}
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                            </Link>
                                        </motion.div>
                                    ))}

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="pt-4 space-y-4"
                                    >
                                        <Button
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Começar
                                        </Button>
                                    </motion.div>
                                </nav>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </Container>
        </header>
    )
}