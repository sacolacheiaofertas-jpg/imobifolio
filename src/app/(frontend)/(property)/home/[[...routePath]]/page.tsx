import { PropertyInquiry } from "@/components/property/property-inquiry"
import { PropertyProvider } from "@/components/providers/property"
import { PropertyDetails } from "@/components/property/details"
import { PropertyFeatures } from "@/components/property/features"
import { PropertyGallery } from "@/components/property/gallery"
import { PropertyMap } from "@/components/property/map"
import { PropertyOverview } from "@/components/property/overview"
import { PropertyMobileStickyCta } from "@/components/property/mobile-sticky-cta"
import { redirect } from "next/navigation"
import { SERVER_URL } from "@/config/env"
import { local } from "@/repository"
import { getSiteSettings } from "@/lib/get-site-settings"

export async function generateMetadata({ params }: { params: Promise<{ routePath: string[] }> }) {
  const { routePath } = await params
  const propertyId = routePath[routePath.length - 1]
  const property = await local.property.getByID(propertyId)
  if (!property) {
    return {
      title: "Imóvel Não Encontrado",
      description: "O imóvel solicitado não foi encontrado em nosso catálogo.",
    }
  }

  return {
    metadataBase: new URL(SERVER_URL || "http://localhost:3000"),
    alternates: {
      canonical: property.url,
    },
    title: property.address.full_address || property.title,
    description: property.description,
  }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ routePath: string[] }>
}) {
  const { routePath } = await params
  const propertyId = routePath[routePath.length - 1]
  const [property, settings] = await Promise.all([
    local.property.getByID(propertyId),
    getSiteSettings(),
  ])

  // ensure canonical URL is correct
  const path = `/home/${routePath.join("/")}`

  if (path !== property.url) {
    redirect(property.url)
  }

  // Obter telefone para WhatsApp (corretor ou padrão da imobiliária)
  const agentPhone = property.original?.agent && typeof property.original.agent !== "string"
    ? property.original.agent.phone
    : settings.whatsappNumber

  const cleanPhone = (agentPhone || settings.whatsappNumber || "5511999998888").replace(/\D/g, "")
  const ddiPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`
  const agentName = property.original?.agent && typeof property.original.agent !== "string"
    ? property.original.agent.full_name
    : undefined

  const fullPropertyUrl = `${SERVER_URL || "http://localhost:8181"}${property.url}`
  const messageText = `Olá! Tenho interesse no imóvel "${property.title}" (Cód: #${property.id}) anunciado por ${property.price}.\nLink: ${fullPropertyUrl}\n\nGostaria de mais informações e agendar visita.`
  const whatsappUrl = `https://wa.me/${ddiPhone}?text=${encodeURIComponent(messageText)}`

  return (
    <PropertyProvider property={property.original}>
      <div className="w-full flex flex-col pb-20 desktop:pb-8">
        <PropertyGallery />
        <div className="max-w-7xl p-4 w-full mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-12 desktop:col-span-8 grid gap-6">
            <PropertyDetails />
            <PropertyOverview />
            <PropertyFeatures />
            <PropertyMap />
          </div>

          <div className="col-span-12 desktop:col-span-4">
            <div className="sticky top-20">
              <PropertyInquiry fallbackWhatsapp={settings.whatsappNumber} />
            </div>
          </div>
        </div>

        {/* Barra Flutuante WhatsApp Mobile */}
        <PropertyMobileStickyCta
          price={property.price}
          agentName={agentName}
          whatsappUrl={whatsappUrl}
        />
      </div>
    </PropertyProvider>
  )
}
