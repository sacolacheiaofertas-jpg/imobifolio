"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MailIcon, PhoneCallIcon, MessageCircle } from "lucide-react"
import { useProperty } from "../providers/property"
import { Media } from "@/payload-types"
import { PropertyInquiryForm } from "@/forms/property-inquiry/form"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const backgroundColors = [
  "#D8E2DC", // Ash gray
  "#FFE5D9", // Pale peach
  "#DBCDF0", // Soft lavender
  "#C7CEEA", // Periwinkle blue
  "#E2CFC4", // Taupe
  "#F2D0A9", // Mellow apricot
  "#C1D3FE", // Baby blue
  "#D0F4DE", // Mint green
  "#F1E3D3", // Cream
  "#C6DEF1", // Powder blue
]

interface PropertyInquiryProps {
  fallbackWhatsapp?: string
}

export const PropertyInquiry = ({ fallbackWhatsapp }: PropertyInquiryProps) => {
  const property = useProperty()
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const agent = property.agent && typeof property.agent !== "string" ? property.agent : null
  const profilePhoto = agent?.profilePhoto as Media | undefined

  const initials = agent?.initials || "CO"

  const bgColor = initials
    ? backgroundColors[initials.charCodeAt(0) % backgroundColors.length]
    : backgroundColors[0]

  // Número do WhatsApp (Corretor ou Fallback das Configurações do Site)
  const rawPhone = agent?.phone || fallbackWhatsapp || "5511999998888"
  const cleanPhone = rawPhone.replace(/\D/g, "")
  const ddiPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`

  const propertyTitle = property.title || "Imóvel"
  const propertyId = property.id || ""
  const propertyPrice = property.price || ""
  const agentGreeting = agent?.full_name ? `Olá ${agent.full_name}!` : "Olá!"

  const urlPart = currentUrl ? `\nLink do imóvel: ${currentUrl}` : ""
  const messageText = `${agentGreeting} Tenho interesse no imóvel "${propertyTitle}" (Cód: #${propertyId}) anunciado por ${propertyPrice}.${urlPart}\n\nGostaria de receber mais detalhes e agendar uma visita.`
  
  const whatsappUrl = `https://wa.me/${ddiPhone}?text=${encodeURIComponent(messageText)}`

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-6 flex flex-col gap-5 shadow-lg">
      <div className="flex items-start gap-4">
        <Avatar className="size-14 border-2 border-primary/20 shadow-sm">
          <AvatarImage className="object-cover" src={profilePhoto?.url ?? ""} />
          <AvatarFallback
            style={{
              backgroundColor: bgColor,
            }}
            className="font-bold text-foreground"
          >
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase font-bold tracking-wider text-primary">
            Corretor Responsável
          </span>
          <h4 className="text-lg font-bold text-foreground leading-snug">
            {agent?.full_name || "Consultoria Imobiliária"}
          </h4>
          <p className="text-xs text-muted-foreground">{agent?.title || "Especialista em Imóveis"}</p>
          <p className="text-xs font-medium text-foreground/80 mt-0.5">
            CRECI: {agent?.licenses?.[0]?.license_number || "Credenciado"}
          </p>
        </div>
      </div>

      {/* Botão de Destaque WhatsApp com Mensagem Inteligente e Link */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <Button className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-sm sm:text-base">
          <MessageCircle className="h-5 w-5 fill-current" />
          Falar no WhatsApp
        </Button>
      </a>

      <div className="flex flex-col gap-2 pt-2 border-t border-border/60 text-xs text-muted-foreground">
        {agent?.phone && (
          <div className="flex items-center gap-2">
            <PhoneCallIcon size={14} className="text-primary" />
            <a href={`tel:${agent.phone}`} className="hover:text-foreground">
              {agent.phone}
            </a>
          </div>
        )}
        {agent?.contact_email && (
          <div className="flex items-center gap-2">
            <MailIcon size={14} className="text-primary" />
            <a href={`mailto:${agent.contact_email}`} className="hover:text-foreground">
              {agent.contact_email}
            </a>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-border/60">
        <p className="text-xs font-semibold text-foreground mb-3">Ou envie uma mensagem por e-mail:</p>
        <PropertyInquiryForm />
      </div>
    </div>
  )
}
