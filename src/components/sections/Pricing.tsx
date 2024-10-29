'use client'

import { useState } from "react"
import { Container } from "@/components/layout/Container"
import { motion } from "framer-motion"
import { Check, X, Sparkles, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { createCheckoutSession } from "@/lib/stripe"
import { CheckoutFormModal } from "@/components/checkout/CheckoutFormModal"
import { useToast } from "@/components/ui/use-toast"

const planIcons = {
  starter: Zap,
  professional: Sparkles,
  enterprise: Shield,
} as const;

type PricingPlan = {
  id: string
  title: string
  description: string
  price: {
    monthly: number
    annual: number
    currency: string
  }
  features: Array<{
    text: string
    included: boolean
  }>
  popular?: boolean
  customPrice?: boolean
}

// Ícones para cada plano
const plans: PricingPlan[] = [
  {
    id: "starter",
    title: "Starter",
    description: "Ideal para profissionais autônomos",
    price: {
      monthly: 369,
      annual: 3690, // 369 * 10 (2 meses grátis)
      currency: "BRL"
    },
    features: [
      { text: "Até 250 agendamentos/mês", included: true },
      { text: "Chatbot IA básico com Whatsapp", included: true },
      { text: "Suporte por email", included: true },
      { text: "Dashboard simples", included: false },
      { text: "API access", included: false },
    ]
  },
  {
    id: "professional",
    title: "Professional",
    description: "Perfeito para clínicas e escritórios",
    price: {
      monthly: 769,
      annual: 7690, // 769 * 10 (2 meses grátis)
      currency: "BRL"
    },
    features: [
      { text: "Até 500 agendamentos/mês", included: true },
      { text: "Chatbot IA avançado", included: true },
      { text: "Dashboard completo", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Relatórios", included: true },
      { text: "Landing page", included: true },
      { text: "Aplicativo IOS & Android", included: false },
      { text: "Website completo do 0", included: false },
    ],
    popular: true
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Para grandes empresas",
    price: {
      monthly: 1390,
      annual: 1390, // 1390 * 10 (2 meses grátis)
      currency: "BRL"
    },
    customPrice: false,
    features: [
      { text: "Agendamentos ilimitados", included: true },
      { text: "IA personalizada", included: true },
      { text: "Dashboard personalizado", included: true },
      { text: "API disponível", included: true },
      { text: "Suporte avançado", included: true },
      { text: "Treinamento dedicado", included: true },
      { text: "Website completo do 0", included: true },
      { text: "Aplicativo IOS & Android", included: true },
    ]
  }
]

type PricingCardProps = PricingPlan & {
  onSelectPlan?: (planId: string) => void
  className?: string
  isAnnual: boolean
}

function PricingCard({
  id,
  title,
  description,
  price,
  features,
  popular = false,
  customPrice = false,
  isAnnual,
  className = "",
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const Icon = planIcons[id as keyof typeof planIcons]
  const { toast } = useToast()
  const SETUP_FEE = 490 // Taxa de implementação em reais

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  // const calculatePrice = (price: { monthly: number; annual: number } | null) => {
  //   if (!price) return null
  //   return isAnnual ? price.annual : price.monthly
  // }

  const handleSelectPlan = () => {
    if (customPrice) {
      // Implementar lógica para plano customizado
      window.location.href = "/contato"
      return
    }
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (data: { email: string; whatsapp: string }) => {
    try {
      setIsLoading(true)

      // Salvar dados do cliente
      await fetch('/api/save-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          whatsapp: data.whatsapp,
          planId: id,
        }),
      });

      // Criar sessão do Stripe
      await createCheckoutSession({
        customerEmail: data.email,
        planId: id,
        isAnnual: isAnnual,
      });

      setIsModalOpen(false)
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Erro",
        description: "Houve um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`relative flex flex-col h-full transition-all duration-300 ${popular ? 'border-blue-600 shadow-xl' : ''
          } ${isHovered ? 'transform -translate-y-2 shadow-lg' : ''} ${className}`}
      >
        {popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            Mais Popular
          </div>
        )}

        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
              <Icon className="w-5 h-5" />
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex flex-col mb-6">
            {customPrice ? (
              <span className="text-2xl font-bold">Personalizado</span>
            ) : (
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    {price ? formatCurrency(isAnnual ? price.annual : price.monthly) : 'Grátis'}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    /{isAnnual ? 'ano' : 'mês'}
                  </span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-green-600">
                    Economia de {formatCurrency(price.monthly * 2)} por ano
                  </div>
                )}
                <div className="mt-2 text-sm text-gray-600">
                  + {formatCurrency(SETUP_FEE)} (taxa única de implementação)
                </div>
                <div className="mt-2 text-sm font-medium">
                  Total primeiro pagamento:{' '}
                  {formatCurrency((isAnnual ? price.annual : price.monthly) + SETUP_FEE)}
                </div>
              </div>
            )}
          </div>

          <ul className="space-y-3 text-sm">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mr-2 h-5 w-5">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-blue-600" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{feature.included ? 'Incluído' : 'Não incluído'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className={!feature.included ? 'text-gray-500' : ''}>
                  {feature.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="mt-auto pt-6">
          <Button
            onClick={handleSelectPlan}
            disabled={isLoading}
            className={`w-full transition-all duration-300 ${popular
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200'
              } ${isHovered ? 'transform scale-105' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="animate-spin">⚪</span>
                Processando...
              </div>
            ) : customPrice ? (
              'Falar com Consultor'
            ) : (
              'Começar Agora'
            )}
          </Button>
        </CardFooter>
      </Card>

      <CheckoutFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        planName={title}
        planId={id}
        planPrice={formatCurrency(isAnnual ? price.annual : price.monthly)}
        isAnnual={isAnnual}
        setupFee={SETUP_FEE}
      />
    </motion.div>
  )
}

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-blue-100 text-blue-600 rounded-full">
            Preços
          </span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Escolha o plano ideal
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Preços transparentes para todos os tamanhos de negócio
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-3 mb-8">
          <span className={`text-sm ${!isAnnual ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
            Mensal
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={`text-sm ${isAnnual ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
            Anual
            <span className="ml-1.5 text-xs text-green-600 font-medium">
              (2 meses grátis)
            </span>
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              {...plan}
              isAnnual={isAnnual}
            />
          ))}
        </motion.div>

        <div className="mt-12 text-center space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cada plano tem um preço de treinamento de inteligência artificial e implantação do sistema de R$490,00.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Todos os preços em Reais. {isAnnual ? 'Faturamento anual.' : 'Faturamento mensal.'}{" "}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Garantia de 7 dias ou seu dinheiro de volta</span>
          </div>
        </div>
      </Container>
    </section>
  )
}