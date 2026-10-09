"use client"

import Image from "next/image"
import Link from "next/link"
import { BedDouble, Bath, Square, MapPin, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/format-price"

export interface SearchPropertyItem {
  id: string
  title: string
  description?: string
  price: number
  listingStatus: "forsale" | "pending" | "contract" | "sold" | "notforsale" | string
  street: string
  address?: {
    street: string
    city: string
    state?: string
    state_abbr?: string
    zip?: string
    full_address?: string
  }
  location?: {
    city?: string
    state_abbr?: string
    zip?: string
    county?: string
  }
  details?: {
    bedrooms?: number
    bathrooms?: number
    squareFeet?: number
    lotSize?: number
    yearBuilt?: number
    propertyType?: string
    heatingType?: string
  }
  photos?: Array<{
    id?: number | string
    url?: string
    alt?: string
  }>
  url?: string
}

const statusLabels: Record<string, { label: string; className: string }> = {
  forsale: { label: "À Venda", className: "bg-emerald-600 hover:bg-emerald-700 text-white" },
  pending: { label: "Pendente", className: "bg-amber-600 hover:bg-amber-700 text-white" },
  contract: { label: "Em Contrato", className: "bg-blue-600 hover:bg-blue-700 text-white" },
  sold: { label: "Vendido", className: "bg-red-600 hover:bg-red-700 text-white" },
  notforsale: { label: "Indisponível", className: "bg-gray-600 hover:bg-gray-700 text-white" },
}

const typeLabels: Record<string, string> = {
  "single-family": "Casa Unifamiliar",
  "multi-family": "Multifamiliar",
  condo: "Apartamento / Condomínio",
  townhouse: "Sobrado / Townhouse",
  land: "Terreno",
  "mobile-home": "Casa Móvel",
  other: "Outro",
}

export function PropertySearchCard({ property }: { property: SearchPropertyItem }) {
  const photoUrl =
    property.photos?.[0]?.url ||
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
  const photoAlt = property.photos?.[0]?.alt || property.title || "Foto do imóvel"

  const city = property.address?.city || property.location?.city || "East Tennessee"
  const state = property.address?.state_abbr || property.location?.state_abbr || "TN"
  const zip = property.address?.zip || property.location?.zip || ""
  const street = property.address?.street || property.street || "Endereço não informado"
  const bedrooms = property.details?.bedrooms ?? 0
  const bathrooms = property.details?.bathrooms ?? 0
  const squareFeet = property.details?.squareFeet ?? 0
  const propertyType = property.details?.propertyType || "single-family"

  const statusConfig = statusLabels[property.listingStatus] || {
    label: property.listingStatus,
    className: "bg-gray-700 text-white",
  }

  const detailUrl = property.url || `/home/${property.id}`

  return (
    <Link href={detailUrl} className="group block h-full">
      <Card className="h-full overflow-hidden border border-border/80 transition-all duration-300 hover:shadow-xl hover:border-primary/40 flex flex-col bg-card">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={photoUrl}
            alt={photoAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <Badge className={`${statusConfig.className} font-medium text-xs px-2.5 py-0.5 shadow-sm`}>
              {statusConfig.label}
            </Badge>
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-normal">
              {typeLabels[propertyType] || propertyType}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <span className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-foreground text-base line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/70" />
              <span className="line-clamp-1">
                {street}, {city}, {state} {zip}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1" title={`${bedrooms} Quartos`}>
              <BedDouble className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{bedrooms}</span>
              <span className="hidden sm:inline">qts</span>
            </div>
            <div className="flex items-center gap-1" title={`${bathrooms} Banheiros`}>
              <Bath className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{bathrooms}</span>
              <span className="hidden sm:inline">banhos</span>
            </div>
            <div className="flex items-center gap-1" title={`${squareFeet} m²`}>
              <Square className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{squareFeet.toLocaleString()}</span>
              <span>m²</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
