"use client"

import { PropertyAddress } from "./address"
import { useProperty } from "../providers/property"
import { PropertyStatus } from "./status"
import { PropertyShare } from "./share"
import { BedDouble, Bath, Maximize2, Tag } from "lucide-react"

export const PropertyDetails = () => {
  const property = useProperty()
  const details = property.details

  return (
    <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
              {property.propertyType || "Imóvel"}
            </span>
            <PropertyStatus />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {property.title}
          </h1>
        </div>

        <div>
          <PropertyAddress />
        </div>

        {/* Informações Principais de Métricas Brasileiras */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-4 border-t border-border/60">
          <div>
            <span className="text-xs text-muted-foreground uppercase font-semibold block mb-0.5">
              Valor de Venda
            </span>
            <h3 className="text-3xl font-extrabold text-primary leading-none">
              {property.price}
            </h3>
          </div>

          {details?.bedrooms !== undefined && details?.bedrooms !== null && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-muted text-foreground">
                <BedDouble className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-2xl font-bold leading-none text-foreground">{details.bedrooms}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 font-medium">Quartos</p>
              </div>
            </div>
          )}

          {details?.bathrooms !== undefined && details?.bathrooms !== null && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-muted text-foreground">
                <Bath className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-2xl font-bold leading-none text-foreground">{details.bathrooms}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 font-medium">Banheiros</p>
              </div>
            </div>
          )}

          {details?.squareFeet !== undefined && details?.squareFeet !== null && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-muted text-foreground">
                <Maximize2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-2xl font-bold leading-none text-foreground">{details.squareFeet}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 font-medium">Área Útil (m²)</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center md:flex-col gap-2 shrink-0">
        <PropertyShare />
      </div>
    </div>
  )
}
