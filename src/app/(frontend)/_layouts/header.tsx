"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, MessageCircle, Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import type { SiteSettingsData } from "@/lib/get-site-settings"

interface HeaderProps {
  settings?: SiteSettingsData
}

export const Header = ({ settings }: HeaderProps) => {
  const siteName = settings?.siteName || "Imobifolio"
  const whatsappNum = settings?.whatsappNumber?.replace(/\D/g, "") || "5511999998888"
  const whatsappMsg = encodeURIComponent(
    settings?.whatsappDefaultMessage || "Olá! Gostaria de mais informações sobre os imóveis disponíveis."
  )
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${whatsappMsg}`

  return (
    <header className="w-full">
      <div className="max-w-7xl flex h-16 items-center justify-between px-4 py-4 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo siteName={siteName} />
        </Link>

        <nav className="hidden tablet:flex items-center gap-6 bg-background/90 backdrop-blur-md px-6 py-2 rounded-full border border-border/50 shadow-sm">
          <Link href="/search" className="text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
            BUSCAR IMÓVEIS
          </Link>
          <Link href="/listings" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            TODOS OS IMÓVEIS
          </Link>
          <Link href="/#property-catalog" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            FILTROS
          </Link>
        </nav>

        <div className="hidden tablet:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
          <Link href="/admin" target="_blank">
            <Button variant="outline" className="font-medium text-xs sm:text-sm border-primary/40 hover:bg-primary/10">
              Painel Admin
            </Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild className="tablet:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="size-6" />
              <span className="sr-only">Menu de navegação</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left font-bold text-xl">{siteName}</SheetTitle>
              <SheetDescription className="text-left">
                {settings?.tagline || "Portal imobiliário de alta performance."}
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-6">
              <Link
                href="/search"
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                Buscar Imóveis
              </Link>
              <Link
                href="/listings"
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                Catálogo Completo
              </Link>
              <Link
                href="/#property-catalog"
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                Filtros Rápidos
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-[#25D366] flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </a>

              <div className="flex flex-col gap-2 pt-6 border-t border-border">
                <Link href="/admin" target="_blank">
                  <Button variant="outline" className="w-full">
                    Acessar Painel Admin
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
