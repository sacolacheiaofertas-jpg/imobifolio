"use client"

import { PropertyDescription } from "./description"
import { useProperty } from "../providers/property"

export const PropertyOverview = () => {
  const property = useProperty()
  const details = property.details

  return (
    <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Sobre o Imóvel</h2>
          <div className="text-muted-foreground leading-relaxed text-base">
            <PropertyDescription />
          </div>
        </div>

        <div className="pt-6 border-t border-border/60">
          <h3 className="text-lg font-bold text-foreground mb-4">Ficha Técnica & Detalhes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <span className="text-xs uppercase font-semibold text-muted-foreground">Tipo de Imóvel</span>
              <p className="text-base font-medium text-foreground mt-0.5">{property.propertyType || "Residencial"}</p>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase font-semibold text-muted-foreground">Ano de Construção</span>
              <p className="text-base font-medium text-foreground mt-0.5">{details?.yearBuilt || "Recente"}</p>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase font-semibold text-muted-foreground">Área Privativa</span>
              <p className="text-base font-medium text-foreground mt-0.5">{details?.squareFeet ? `${details.squareFeet} m²` : "Sob Consulta"}</p>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase font-semibold text-muted-foreground">Status</span>
              <p className="text-base font-medium text-foreground mt-0.5">{property.listingStatus === "active" ? "Disponível para Venda" : "Sob Negociação"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
