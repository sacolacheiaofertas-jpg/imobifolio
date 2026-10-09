"use client"

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Phone, Search, MessageCircle } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import homeForeground from "@/assets/smokymountainhome2.png"
import homeBackground from "@/assets/home-background.png"
import { cn } from "@/lib/utils"
import type { SiteSettingsData } from "@/lib/get-site-settings"

interface HeroProps {
  settings?: SiteSettingsData
}

export default function Hero({ settings }: HeroProps) {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>(null)

  const [propertyType, setPropertyType] = useState("all")
  const [location, setLocation] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [bedrooms, setBedrooms] = useState("all")

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const calculateScale = () => {
    const maxScale = 1.2
    const minScale = 1
    const scrollThreshold = 500
    const scale = Math.max(minScale, maxScale - (scrollY / scrollThreshold) * (maxScale - minScale))
    return scale
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (propertyType !== "all") params.set("type", propertyType)
    if (location !== "all") params.set("location", location)
    if (priceRange !== "all") params.set("price", priceRange)
    if (bedrooms !== "all") params.set("bedrooms", bedrooms)

    const catalogElement = document.getElementById("property-catalog")
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/search?${params.toString()}`)
    }
  }

  const whatsappNum = settings?.whatsappNumber?.replace(/\D/g, "") || "5511999998888"
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    settings?.whatsappDefaultMessage || "Olá! Gostaria de mais informações sobre os imóveis."
  )}`

  return (
    <>
      <section className="relative min-h-[640px] large:h-[640px] xlarge:h-[840px] overflow-hidden w-full">
        <div
          ref={imageRef}
          className={cn(`absolute inset-0 z-0 overflow-hidden bg-left-top bg-cover bg-fixed`)}
          style={{
            backgroundImage: `url(${homeBackground.src})`,
          }}
        >
          <Image
            src={homeForeground}
            alt="Imóveis de Alto Padrão"
            fill
            className="object-center object-cover brightness-[0.9]"
            style={{
              transform: `scale(${calculateScale()})`,
              willChange: "transform",
            }}
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-28 sm:py-32">
          <div className="max-w-xl space-y-5 bg-background/90 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border border-border/50">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              {settings?.siteName || "Imobifolio"} • {settings?.creci || "CRECI Oficial"}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">
              Encontre o Imóvel Perfeito para Sua Família
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {settings?.tagline || "Casas, coberturas e apartamentos nos bairros mais nobres e valorizados. Atendimento ágil e personalizado via WhatsApp."}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-md px-5 py-2.5 flex items-center gap-2 shadow font-semibold">
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </Button>
              </a>
              <Button
                variant="outline"
                className="bg-background/80 backdrop-blur-sm rounded-md px-5 py-2.5 font-medium"
                onClick={() => router.push("/search")}
              >
                Ver Catálogo Completo
              </Button>
            </div>
          </div>

          {/* Search Filters */}
          <div className="mt-8 sm:mt-12 bg-background/95 backdrop-blur-md p-6 rounded-xl shadow-2xl max-w-5xl border border-border/60">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
                  Tipo de Imóvel
                </span>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="w-full bg-background border-border text-foreground">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent className="text-foreground bg-background">
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="apartment">Apartamento</SelectItem>
                    <SelectItem value="single-family">Casa em Condomínio</SelectItem>
                    <SelectItem value="townhouse">Sobrado / Duplex</SelectItem>
                    <SelectItem value="land">Terreno / Lote</SelectItem>
                    <SelectItem value="condo">Studio / Cobertura</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
                  Região / Bairro
                </span>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-full bg-background border-border text-foreground">
                    <SelectValue placeholder="Todas as cidades" />
                  </SelectTrigger>
                  <SelectContent className="text-foreground bg-background">
                    <SelectItem value="all">Todas as regiões</SelectItem>
                    <SelectItem value="Jardins">Jardins (SP)</SelectItem>
                    <SelectItem value="Moema">Moema (SP)</SelectItem>
                    <SelectItem value="Itaim Bibi">Itaim Bibi (SP)</SelectItem>
                    <SelectItem value="Leblon">Leblon (RJ)</SelectItem>
                    <SelectItem value="Ipanema">Ipanema (RJ)</SelectItem>
                    <SelectItem value="Barra da Tijuca">Barra da Tijuca (RJ)</SelectItem>
                    <SelectItem value="Batel">Batel (Curitiba)</SelectItem>
                    <SelectItem value="Jurerê">Jurerê (Florianópolis)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
                  Faixa de Preço
                </span>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full bg-background border-border text-foreground">
                    <SelectValue placeholder="Qualquer Preço" />
                  </SelectTrigger>
                  <SelectContent className="text-foreground bg-background">
                    <SelectItem value="all">Qualquer preço</SelectItem>
                    <SelectItem value="under-500k">Até R$ 500.000</SelectItem>
                    <SelectItem value="500k-1m">R$ 500k - R$ 1 Milhão</SelectItem>
                    <SelectItem value="1m-2m">R$ 1M - R$ 2 Milhões</SelectItem>
                    <SelectItem value="2m-4m">R$ 2M - R$ 4 Milhões</SelectItem>
                    <SelectItem value="above-4m">Acima de R$ 4 Milhões</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
                  Quartos
                </span>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className="w-full bg-background border-border text-foreground">
                    <SelectValue placeholder="Quartos" />
                  </SelectTrigger>
                  <SelectContent className="text-foreground bg-background">
                    <SelectItem value="all">Qualquer quantidade</SelectItem>
                    <SelectItem value="1">1+ quartos</SelectItem>
                    <SelectItem value="2">2+ quartos</SelectItem>
                    <SelectItem value="3">3+ quartos</SelectItem>
                    <SelectItem value="4">4+ quartos</SelectItem>
                    <SelectItem value="5">5+ quartos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button
                  onClick={handleSearch}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10 shadow"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Imóveis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
