export type PlanInterval = 'month' | 'year'

export type PricingFeature = {
  text: string
  included: boolean
}

export type PricingPlan = {
  id: string
  title: string
  description: string
  price: {
    value: number | null
    currency: 'BRL'
    interval?: PlanInterval
  }
  features: PricingFeature[]
  popular?: boolean
  customPrice?: boolean
}