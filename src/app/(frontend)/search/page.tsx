import { FixedHeader } from "@/app/(frontend)/_layouts/fixed-header"
import { Footer } from "@/app/(frontend)/_layouts/footer"
import { PropertySearchView } from "@/components/search/property-search-view"
import { local } from "@/repository"
import { getSiteSettings } from "@/lib/get-site-settings"

export const dynamic = "force-dynamic"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string
    location?: string
    price?: string
    bedrooms?: string
    search?: string
  }>
}) {
  const [params, properties, settings] = await Promise.all([
    searchParams,
    local.property.getAll({}, 100),
    getSiteSettings(),
  ])

  // Map into search item structure
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

  const initialFilters = {
    search: params.location || params.search || "",
    propertyType: params.type || "all",
    priceRange: params.price || "all",
    bedrooms: params.bedrooms || "all",
    sortBy: "featured",
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <FixedHeader settings={settings} />
      <main className="flex-1 pt-24 pb-16">
        <PropertySearchView
          initialProperties={mappedProperties}
          title="Busca de Imóveis"
          subtitle="Explore nossa carteira completa de imóveis selecionados com filtros avançados em tempo real."
          initialFilters={initialFilters}
        />
      </main>
      <Footer settings={settings} />
    </div>
  )
}
