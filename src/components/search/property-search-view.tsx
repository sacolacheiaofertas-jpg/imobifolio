"use client"

import { useState, useMemo, useEffect } from "react"
import { PropertyFilterBar, FilterState } from "./property-filter-bar"
import { PropertySearchCard, SearchPropertyItem } from "./property-search-card"
import { Button } from "@/components/ui/button"
import { Home, Frown, Sparkles } from "lucide-react"

interface PropertySearchViewProps {
  initialProperties?: SearchPropertyItem[]
  title?: string
  subtitle?: string
  initialFilters?: Partial<FilterState>
}

const defaultFilters: FilterState = {
  search: "",
  propertyType: "all",
  priceRange: "all",
  bedrooms: "all",
  sortBy: "featured",
}

export function PropertySearchView({
  initialProperties = [],
  title = "Explorar Imóveis",
  subtitle = "Encontre a residência perfeita filtrando por preço, localização, quartos e tipo",
  initialFilters = {},
}: PropertySearchViewProps) {
  const [properties, setProperties] = useState<SearchPropertyItem[]>(initialProperties)
  const [loading, setLoading] = useState(initialProperties.length === 0)
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters,
  })

  // If no initialProperties were passed, fetch from /api/properties
  useEffect(() => {
    if (initialProperties.length > 0) return

    let isMounted = true
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/properties?limit=100")
        if (!res.ok) throw new Error("Falha ao carregar imóveis")
        const data = await res.json()
        if (isMounted && data.docs) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped = data.docs.map((doc: any) => ({
            id: String(doc.id),
            title: doc.title,
            description: doc.description,
            price: Number(doc.price),
            listingStatus: doc.listingStatus,
            street: doc.street || doc.address?.street || "",
            address: doc.address,
            location: doc.location,
            details: doc.details,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            photos: (doc.photos || []).map((p: any) => ({
              id: p.id,
              url: p.url,
              alt: p.alt || doc.title,
            })),
            url: doc.url || `/home/${doc.id}`,
          }))
          setProperties(mapped)
        }
      } catch (err) {
        console.error("Erro ao buscar imóveis:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchProperties()
    return () => {
      isMounted = false
    }
  }, [initialProperties])

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleReset = () => {
    setFilters(defaultFilters)
  }

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        // Search text (neighborhood, city, street, title, description)
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase()
          const street = (prop.address?.street || prop.street || "").toLowerCase()
          const city = (prop.address?.city || prop.location?.city || "").toLowerCase()
          const county = (prop.location?.county || "").toLowerCase()
          const fullAddress = (prop.address?.full_address || "").toLowerCase()
          const title = (prop.title || "").toLowerCase()

          const matchesSearch =
            street.includes(q) ||
            city.includes(q) ||
            county.includes(q) ||
            fullAddress.includes(q) ||
            title.includes(q)

          if (!matchesSearch) return false
        }

        // Property type
        if (filters.propertyType !== "all") {
          const propType = prop.details?.propertyType
          if (propType !== filters.propertyType) return false
        }

        // Price range
        if (filters.priceRange !== "all") {
          const price = prop.price
          switch (filters.priceRange) {
            case "under-500k":
              if (price > 500000) return false
              break
            case "500k-1m":
              if (price < 500000 || price > 1000000) return false
              break
            case "1m-2m":
              if (price < 1000000 || price > 2000000) return false
              break
            case "2m-4m":
              if (price < 2000000 || price > 4000000) return false
              break
            case "above-4m":
              if (price < 4000000) return false
              break
          }
        }

        // Bedrooms
        if (filters.bedrooms !== "all") {
          const minBeds = Number(filters.bedrooms)
          const beds = prop.details?.bedrooms ?? 0
          if (beds < minBeds) return false
        }

        return true
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "price-asc":
            return a.price - b.price
          case "price-desc":
            return b.price - a.price
          case "bedrooms-desc":
            return (b.details?.bedrooms ?? 0) - (a.details?.bedrooms ?? 0)
          default:
            return 0
        }
      })
  }, [properties, filters])

  return (
    <section className="py-12 bg-background" id="property-catalog">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1.5 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            Catálogo em Tempo Real
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>
        </div>

        {/* Filter Bar */}
        <PropertyFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          totalCount={properties.length}
          filteredCount={filteredProperties.length}
        />

        {/* Loading state */}
        {loading && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground font-medium">Carregando imóveis disponíveis...</p>
          </div>
        )}

        {/* Results grid */}
        {!loading && filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertySearchCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredProperties.length === 0 && (
          <div className="py-16 px-4 text-center border-2 border-dashed border-border rounded-2xl bg-muted/20 max-w-lg mx-auto">
            <Frown className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              Nenhum imóvel corresponde aos critérios de preço, bairro, quartos ou tipo selecionados.
            </p>
            <Button onClick={handleReset} variant="default" className="gap-2">
              <Home className="h-4 w-4" />
              Limpar Filtros e Ver Todos
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
