"use client"

import { useProperty } from "../providers/property"
import { MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export const PropertyMap = () => {
  const property = useProperty()
  const address = property.address

  // Montar endereço completo para busca no Google Maps
  const fullAddress = address?.full_address || [
    address?.street,
    address?.city,
    address?.state_abbr,
    "Brasil"
  ].filter(Boolean).join(", ")

  const encodedAddress = encodeURIComponent(fullAddress || property.title || "Brasil")
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  const embedMapsUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-foreground">Localização & Vizinhança</h2>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span>{fullAddress}</span>
            </div>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs font-semibold hover:bg-primary/10 border-primary/30"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Abrir no Google Maps
            </Button>
          </a>
        </div>

        {/* Mapa Interativo Embutido via Iframe do Google Maps (Gratuito e sem chave API) */}
        <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden border border-border/80 shadow-inner bg-muted">
          <iframe
            title={`Mapa do imóvel ${property.title}`}
            src={embedMapsUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[20%] contrast-[105%]"
          />
        </div>
      </div>
    </div>
  )
}
