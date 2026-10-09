"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PropertyMobileStickyCtaProps {
  price?: string | number
  agentName?: string
  whatsappUrl: string
}

export const PropertyMobileStickyCta = ({
  price,
  agentName,
  whatsappUrl,
}: PropertyMobileStickyCtaProps) => {
  return (
    <div className="desktop:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-3 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] flex items-center justify-between gap-3">
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider truncate">
          {agentName ? `Falar com ${agentName.split(" ")[0]}` : "Valor de Venda"}
        </span>
        <span className="text-base sm:text-lg font-extrabold text-foreground truncate">
          {price || "Sob Consulta"}
        </span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0"
      >
        <Button className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold h-11 px-5 rounded-xl flex items-center gap-2 shadow-md text-sm">
          <MessageCircle className="h-5 w-5 fill-current" />
          WhatsApp
        </Button>
      </a>
    </div>
  )
}
