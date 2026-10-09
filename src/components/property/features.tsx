"use client"

import { Feature } from "@/payload-types"
import { useProperty } from "../providers/property"
import { Check } from "lucide-react"

export const PropertyFeatures = () => {
  const property = useProperty()
  const groupedFeatures = property.features.reduce(
    (acc, feature) => {
      acc[feature.category] = [...(acc[feature.category] || []), feature]
      return acc
    },
    {} as Record<string, Feature[]>,
  )

  const categoryLabels: Record<string, string> = {
    interior: "Área Interna",
    exterior: "Área Externa & Lazer",
    community: "Condomínio & Segurança",
    utilities: "Infraestrutura & Sustentabilidade",
  }

  return (
    <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Comodidades & Diferenciais</h2>
          <p className="text-sm text-muted-foreground">Itens exclusivos e infraestrutura deste imóvel</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {Object.entries(groupedFeatures).map(([category, features]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-border/60 pb-2">
                {categoryLabels[category.toLowerCase()] || category}
              </h3>
              <ul className="grid grid-cols-1 gap-2.5">
                {features.map((feature) => (
                  <li key={feature.id} className="flex items-center gap-2.5 text-sm text-foreground/90">
                    <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary shrink-0">
                      <Check className="size-3" />
                    </span>
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
