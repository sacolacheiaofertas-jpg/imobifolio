import { Logo } from "@/components/logo"
import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import type { SiteSettingsData } from "@/lib/get-site-settings"

interface FooterProps {
  settings?: SiteSettingsData
}

export const Footer = ({ settings }: FooterProps) => {
  const siteName = settings?.siteName || "Imobifolio"
  const creci = settings?.creci || "CRECI 12345-J"
  const phone = settings?.primaryPhone || "(11) 99999-8888"
  const email = settings?.contactEmail || "contato@imobifolio.com.br"
  const address = settings?.address || "São Paulo - SP, Brasil"
  const whatsappNum = settings?.whatsappNumber?.replace(/\D/g, "") || "5511999998888"
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("Olá! Gostaria de falar com um corretor.")}`

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <Logo siteName={siteName} />
            </div>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              Sua plataforma de imóveis de alto padrão e oportunidades exclusivas. Assessoria imobiliária
              completa com corretores credenciados para garantir a melhor experiência na compra, venda ou locação do seu patrimônio.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">{creci}</p>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{email}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-foreground">Navegação</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">
                    Buscar Imóveis
                  </Link>
                </li>
                <li>
                  <Link href="/listings" className="text-muted-foreground hover:text-primary transition-colors">
                    Todos os Imóveis
                  </Link>
                </li>
                <li>
                  <Link href="/#property-catalog" className="text-muted-foreground hover:text-primary transition-colors">
                    Filtros Rápidos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-foreground">Tipos de Imóveis</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/search?type=apartment" className="text-muted-foreground hover:text-primary transition-colors">
                    Apartamentos
                  </Link>
                </li>
                <li>
                  <Link href="/search?type=single-family" className="text-muted-foreground hover:text-primary transition-colors">
                    Casas em Condomínio
                  </Link>
                </li>
                <li>
                  <Link href="/search?type=townhouse" className="text-muted-foreground hover:text-primary transition-colors">
                    Coberturas e Duplex
                  </Link>
                </li>
                <li>
                  <Link href="/search?type=land" className="text-muted-foreground hover:text-primary transition-colors">
                    Terrenos e Lotes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-foreground">Atendimento</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-semibold flex items-center gap-1.5 hover:underline"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Plantão WhatsApp
                  </a>
                </li>
                <li>
                  <Link href="/admin" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                    Painel do Corretor
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-xs text-center text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} {siteName}. Todos os direitos reservados. {creci}.</p>
          <p className="text-[11px] text-muted-foreground/70">
            Powered by <span className="font-semibold text-foreground">Imobifolio SaaS</span> • Alta Performance Imobiliária
          </p>
        </div>
      </div>
    </footer>
  )
}
