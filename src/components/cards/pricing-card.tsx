'use client'

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PricingPlan } from "@/types/pricing"

type PricingCardProps = PricingPlan & {
  onSelectPlan?: (planId: string) => void
  className?: string
}

export function PricingCard({
  id,
  title,
  description,
  price,
  features,
  popular = false,
  customPrice = false,
  onSelectPlan,
  className = "",
}: PricingCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const handleSelectPlan = () => {
    onSelectPlan?.(id)
  }

  return (
    <Card 
      className={`flex flex-col relative ${
        popular ? 'border-blue-600 shadow-lg scale-105' : ''
      } ${className}`}
    >
      {popular && (
        <div className="absolute -top-3 -right-3 px-3 py-1 text-xs font-medium tracking-wider text-white bg-blue-600 rounded-full">
          POPULAR
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-baseline mb-6">
          {customPrice ? (
            <span className="text-2xl font-bold">Personalizado</span>
          ) : (
            <>
              <span className="text-4xl font-bold">
                {price.value ? formatCurrency(price.value) : 'Grátis'}
              </span>
              {price.interval && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  /{price.interval === 'month' ? 'mês' : 'ano'}
                </span>
              )}
            </>
          )}
        </div>

        <ul className="space-y-3 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-2 h-5 w-5">
                {feature.included ? (
                  <Check className="h-5 w-5 text-blue-600" />
                ) : (
                  <X className="h-5 w-5 text-gray-300" />
                )}
              </div>
              <span className={!feature.included ? 'text-gray-500' : ''}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={handleSelectPlan}
          className={`w-full ${
            popular 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200'
          }`}
        >
          {customPrice ? 'Falar com Consultor' : 'Escolher Plano'}
        </Button>
      </CardFooter>
    </Card>
  )
}