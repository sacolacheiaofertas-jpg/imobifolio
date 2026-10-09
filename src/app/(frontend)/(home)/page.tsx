import Image from "next/image"
import { Button } from "@/components/ui/button"
import Hero from "@/app/(frontend)/(home)/_components/hero"
import singleFamilyHomeKnoxville from "@/assets/knoxville-single-family.png"
import villaHomeKnoxville from "@/assets/villa.png"
import momAvatar from "@/assets/mom-avatar.png"
import attorneyAvatar from "@/assets/attorney.png"
import ruralMomAvatar from "@/assets/rural-mom.png"
import landPlot from "@/assets/land.png"
import apartment from "@/assets/apartment.png"
import office from "@/assets/office.png"
import condo from "@/assets/condo.png"
import { FixedHeader } from "../_layouts/fixed-header"
import { Footer } from "../_layouts/footer"
import { FeaturedProperties } from "@/blocks/featured-properties"
import { PropertySearchView } from "@/components/search/property-search-view"
import { local } from "@/repository"
import { getSiteSettings } from "@/lib/get-site-settings"
import { MessageCircle, ShieldCheck, Clock, Award, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
  const [properties, settings] = await Promise.all([
    local.property.getAll({}, 100),
    getSiteSettings(),
  ])

  const mappedProperties = properties.map((prop) => ({
    id: String(prop.id),
    title: prop.title,
    description: prop.description,
    price: prop.original.price || 0,
    listingStatus: prop.listingStatus,
    street: prop.address?.street || "",
    address: prop.address,
    details: prop.original.details,
    photos: prop.photos.map((p) => ({
      id: p.id,
      url: p.url,
      alt: p.alt || prop.title,
    })),
    url: prop.url,
  }))

  const whatsappNum = settings.whatsappNumber?.replace(/\D/g, "") || "5511999998888"
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    settings.whatsappDefaultMessage || "Olá! Gostaria de consultoria para encontrar um imóvel."
  )}`

  return (
    <div className="flex min-h-screen flex-col">
      <FixedHeader settings={settings} />

      <main className="flex-1">
        <Hero settings={settings} />

        {/* About Section - Brazilian Real Estate */}
        <section className="py-16 bg-background text-foreground border-b border-border/40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col tablet:flex-row gap-12 items-center">
              <div className="tablet:w-1/2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                  Experiência & Tradição
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">
                  Seu Parceiro de Confiança no Mercado Imobiliário
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Trabalhamos com uma curadoria rigorosa de imóveis de alto padrão e oportunidades de investimento nas regiões mais valorizadas. Cada propriedade é avaliada detalhadamente para garantir segurança jurídica e liquidez.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Nossos corretores credenciados oferecem atendimento exclusivo e humanizado, auxiliando você em todas as etapas: desde a escolha do bairro até a assinatura da escritura.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-md px-6 py-2.5 font-semibold flex items-center gap-2 shadow">
                      <MessageCircle className="h-4 w-4" />
                      Falar com Especialista
                    </Button>
                  </a>
                  <Link href="/search">
                    <Button variant="outline" className="rounded-md px-6 py-2.5">
                      Explorar Imóveis
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="tablet:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="bg-card border border-border/60 p-6 rounded-xl shadow-sm">
                  <Award className="h-8 w-8 text-primary mb-3" />
                  <div className="text-3xl font-extrabold text-foreground mb-1">+60</div>
                  <p className="text-sm font-semibold text-foreground">Imóveis no Portfólio</p>
                  <p className="text-xs text-muted-foreground mt-1">Opções selecionadas em bairros nobres e condomínios fechados.</p>
                </div>
                <div className="bg-card border border-border/60 p-6 rounded-xl shadow-sm">
                  <ShieldCheck className="h-8 w-8 text-primary mb-3" />
                  <div className="text-3xl font-extrabold text-foreground mb-1">100%</div>
                  <p className="text-sm font-semibold text-foreground">Segurança Jurídica</p>
                  <p className="text-xs text-muted-foreground mt-1">Documentação e certidões checadas previamente.</p>
                </div>
                <div className="bg-card border border-border/60 p-6 rounded-xl shadow-sm">
                  <Clock className="h-8 w-8 text-primary mb-3" />
                  <div className="text-3xl font-extrabold text-foreground mb-1">Ágil</div>
                  <p className="text-sm font-semibold text-foreground">Atendimento Direto</p>
                  <p className="text-xs text-muted-foreground mt-1">Conexão instantânea via WhatsApp com o corretor responsável.</p>
                </div>
                <div className="bg-card border border-border/60 p-6 rounded-xl shadow-sm">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                  <div className="text-3xl font-extrabold text-foreground mb-1">{settings.creci || "CRECI"}</div>
                  <p className="text-sm font-semibold text-foreground">Credenciamento Oficial</p>
                  <p className="text-xs text-muted-foreground mt-1">Profissionais regulamentados pelo conselho regional.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Filterable Property Explorer */}
        <PropertySearchView
          initialProperties={mappedProperties}
          title="Buscar e Filtrar Imóveis"
          subtitle="Utilize os filtros abaixo para encontrar o imóvel perfeito por preço, bairro/cidade, quantidade de quartos e tipo."
        />

        <FeaturedProperties />

        {/* Property Types */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Categorias em Destaque</h2>
                <p className="text-muted-foreground text-sm mt-1">Explore as principais opções de moradia e investimento</p>
              </div>
              <Link href="/search" className="text-primary font-semibold text-sm hover:underline mt-2 sm:mt-0">
                Ver todos os tipos &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
              <Link href="/search?type=apartment" className="group relative overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={apartment}
                  alt="Apartamentos"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">APARTAMENTOS</h3>
                  <p className="text-white/80 text-sm">Opções nos melhores bairros</p>
                </div>
              </Link>

              <Link href="/search?type=single-family" className="group relative overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={singleFamilyHomeKnoxville}
                  alt="Casas em Condomínio"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">CASAS EM CONDOMÍNIO</h3>
                  <p className="text-white/80 text-sm">Privacidade, espaço e segurança 24h</p>
                </div>
              </Link>

              <Link href="/search?type=villa" className="group relative overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={villaHomeKnoxville}
                  alt="Mansões e Alto Padrão"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">MANSÕES & COBERTURAS</h3>
                  <p className="text-white/80 text-sm">Acabamentos nobres e vistas panorâmicas</p>
                </div>
              </Link>

              <Link href="/search?type=condo" className="group relative overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={condo}
                  alt="Studios & Lofts"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">STUDIOS & COMPACTOS</h3>
                  <p className="text-white/80 text-sm">Alta rentabilidade para locação</p>
                </div>
              </Link>

              <Link href="/search?type=land" className="group relative overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={landPlot}
                  alt="Terrenos e Lotes"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">TERRENOS & LOTES</h3>
                  <p className="text-white/80 text-sm">Construa o projeto da sua vida</p>
                </div>
              </Link>

              <Link href="/search?type=office" className="group relative overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={office}
                  alt="Salas Comerciais"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">COMERCIAL & ESCRITÓRIOS</h3>
                  <p className="text-white/80 text-sm">Lajes corporativas e consultórios</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-card text-foreground border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col tablet:flex-row bg-background rounded-2xl overflow-hidden shadow-xl border border-border">
              <div className="tablet:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                  Atendimento Personalizado
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
                  Quer Vender ou Encontrar um Imóvel Específico?
                </h2>
                <p className="text-muted-foreground mb-8 text-sm sm:text-base leading-relaxed">
                  Converse diretamente com um dos nossos consultores. Fazemos a busca ativa e filtramos as melhores oportunidades do mercado de acordo com seu perfil e orçamento.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold flex items-center gap-2 shadow px-6 py-2.5">
                      <MessageCircle className="h-4 w-4" />
                      Chamar no WhatsApp Agora
                    </Button>
                  </a>
                  <Link href="/search">
                    <Button variant="outline" className="px-6 py-2.5">
                      Ver Todos os Imóveis
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="tablet:w-1/2 relative min-h-[300px]">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
                  alt="Consultoria Imobiliária"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  )
}
