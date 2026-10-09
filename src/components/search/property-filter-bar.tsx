"use client"

import { useState } from "react"
import { Search, RotateCcw, SlidersHorizontal, X, Check, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

export interface FilterState {
  search: string
  propertyType: string
  priceRange: string
  bedrooms: string
  sortBy: string
}

interface PropertyFilterBarProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: string) => void
  onReset: () => void
  totalCount: number
  filteredCount: number
}

export function PropertyFilterBar({
  filters,
  onFilterChange,
  onReset,
  totalCount,
  filteredCount,
}: PropertyFilterBarProps) {
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false)
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true)

  // Count active filters
  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.propertyType !== "all" ? 1 : 0) +
    (filters.priceRange !== "all" ? 1 : 0) +
    (filters.bedrooms !== "all" ? 1 : 0)

  const isFiltered = activeFiltersCount > 0

  return (
    <div className="bg-card border border-border/70 rounded-xl p-3 sm:p-5 shadow-sm mb-8 space-y-3">
      {/* Search Input + Action Buttons */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="Buscar por bairro, cidade, rua..."
            className="pl-10 h-10 sm:h-11 bg-background text-foreground"
          />
        </div>

        {/* Mobile Filter Button (Triggers Drawer) */}
        <div className="lg:hidden">
          <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant={isFiltered ? "default" : "outline"}
                className="h-10 sm:h-11 px-3 sm:px-4 flex items-center gap-2 shrink-0"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden xs:inline">Filtros</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>

            <SheetContent side="bottom" className="rounded-t-2xl max-h-[85vh] overflow-y-auto px-5 py-6">
              <SheetHeader className="text-left pb-3 border-b border-border/60">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-bold">Filtros de Imóveis</SheetTitle>
                  {isFiltered && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onReset}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Limpar todos
                    </Button>
                  )}
                </div>
                <SheetDescription className="text-xs">
                  Refine por tipo de imóvel, faixa de preço, quartos e ordenação.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-4 py-4">
                {/* Mobile: Tipo de Imóvel */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Tipo de Imóvel
                  </label>
                  <Select
                    value={filters.propertyType}
                    onValueChange={(val) => onFilterChange("propertyType", val)}
                  >
                    <SelectTrigger className="h-11 w-full bg-background border-border text-foreground">
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="single-family">Casa Unifamiliar</SelectItem>
                      <SelectItem value="multi-family">Multifamiliar</SelectItem>
                      <SelectItem value="condo">Apartamento / Condomínio</SelectItem>
                      <SelectItem value="townhouse">Sobrado / Townhouse</SelectItem>
                      <SelectItem value="land">Terreno</SelectItem>
                      <SelectItem value="mobile-home">Casa Móvel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile: Faixa de Preço */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Faixa de Preço
                  </label>
                  <Select
                    value={filters.priceRange}
                    onValueChange={(val) => onFilterChange("priceRange", val)}
                  >
                    <SelectTrigger className="h-11 w-full bg-background border-border text-foreground">
                      <SelectValue placeholder="Qualquer preço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Qualquer preço</SelectItem>
                      <SelectItem value="under-500k">Até R$ 500.000</SelectItem>
                      <SelectItem value="500k-1m">R$ 500.000 – R$ 1.000.000</SelectItem>
                      <SelectItem value="1m-2m">R$ 1.000.000 – R$ 2.000.000</SelectItem>
                      <SelectItem value="2m-4m">R$ 2.000.000 – R$ 4.000.000</SelectItem>
                      <SelectItem value="above-4m">Acima de R$ 4.000.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile: Quartos */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Quartos
                  </label>
                  <Select
                    value={filters.bedrooms}
                    onValueChange={(val) => onFilterChange("bedrooms", val)}
                  >
                    <SelectTrigger className="h-11 w-full bg-background border-border text-foreground">
                      <SelectValue placeholder="Qualquer quantidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Qualquer quantidade</SelectItem>
                      <SelectItem value="1">1+ quartos</SelectItem>
                      <SelectItem value="2">2+ quartos</SelectItem>
                      <SelectItem value="3">3+ quartos</SelectItem>
                      <SelectItem value="4">4+ quartos</SelectItem>
                      <SelectItem value="5">5+ quartos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile: Ordenação */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Ordenar Por
                  </label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(val) => onFilterChange("sortBy", val)}
                  >
                    <SelectTrigger className="h-11 w-full bg-background border-border text-foreground">
                      <SelectValue placeholder="Ordenar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Destaques</SelectItem>
                      <SelectItem value="price-asc">Menor Preço</SelectItem>
                      <SelectItem value="price-desc">Maior Preço</SelectItem>
                      <SelectItem value="bedrooms-desc">Mais Quartos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <SheetFooter className="pt-2">
                <SheetClose asChild>
                  <Button className="w-full h-12 text-base font-bold bg-primary text-primary-foreground shadow">
                    Ver {filteredCount} Imóveis
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Expand/Collapse and Reset */}
        <div className="hidden lg:flex items-center gap-2">
          {isFiltered && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground shrink-0 h-11 px-3 text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Limpar</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDesktopExpanded((prev) => !prev)}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground shrink-0 h-11 px-2 text-xs"
            title={isDesktopExpanded ? "Recolher filtros" : "Expandir filtros"}
          >
            {isDesktopExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>Ocultar</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>Mais Filtros</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Desktop Filters Grid (Collapsible) */}
      {isDesktopExpanded && (
        <div className="hidden lg:grid grid-cols-4 gap-3 pt-2">
          {/* Tipo de Imóvel */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Tipo de Imóvel
            </label>
            <Select
              value={filters.propertyType}
              onValueChange={(val) => onFilterChange("propertyType", val)}
            >
              <SelectTrigger className="h-10 bg-background text-foreground border-border">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="single-family">Casa Unifamiliar</SelectItem>
                <SelectItem value="multi-family">Multifamiliar</SelectItem>
                <SelectItem value="condo">Apartamento / Condomínio</SelectItem>
                <SelectItem value="townhouse">Sobrado / Townhouse</SelectItem>
                <SelectItem value="land">Terreno</SelectItem>
                <SelectItem value="mobile-home">Casa Móvel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Faixa de Preço */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Faixa de Preço
            </label>
            <Select
              value={filters.priceRange}
              onValueChange={(val) => onFilterChange("priceRange", val)}
            >
              <SelectTrigger className="h-10 bg-background text-foreground border-border">
                <SelectValue placeholder="Qualquer preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer preço</SelectItem>
                <SelectItem value="under-500k">Até R$ 500.000</SelectItem>
                <SelectItem value="500k-1m">R$ 500.000 – R$ 1.000.000</SelectItem>
                <SelectItem value="1m-2m">R$ 1.000.000 – R$ 2.000.000</SelectItem>
                <SelectItem value="2m-4m">R$ 2.000.000 – R$ 4.000.000</SelectItem>
                <SelectItem value="above-4m">Acima de R$ 4.000.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quartos */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Quartos
            </label>
            <Select
              value={filters.bedrooms}
              onValueChange={(val) => onFilterChange("bedrooms", val)}
            >
              <SelectTrigger className="h-10 bg-background text-foreground border-border">
                <SelectValue placeholder="Qualquer quantidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer quantidade</SelectItem>
                <SelectItem value="1">1+ quartos</SelectItem>
                <SelectItem value="2">2+ quartos</SelectItem>
                <SelectItem value="3">3+ quartos</SelectItem>
                <SelectItem value="4">4+ quartos</SelectItem>
                <SelectItem value="5">5+ quartos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ordenação */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Ordenar Por
            </label>
            <Select
              value={filters.sortBy}
              onValueChange={(val) => onFilterChange("sortBy", val)}
            >
              <SelectTrigger className="h-10 bg-background text-foreground border-border">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destaques</SelectItem>
                <SelectItem value="price-asc">Menor Preço</SelectItem>
                <SelectItem value="price-desc">Maior Preço</SelectItem>
                <SelectItem value="bedrooms-desc">Mais Quartos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Active Filter Chips (Removable) */}
      {isFiltered && (
        <div className="flex flex-wrap gap-1.5 pt-1 items-center">
          <span className="text-xs text-muted-foreground mr-1">Filtros ativos:</span>
          {filters.search && (
            <Badge variant="secondary" className="gap-1 text-xs px-2 py-0.5">
              Busca: &quot;{filters.search}&quot;
              <X
                className="h-3 w-3 cursor-pointer hover:text-red-500"
                onClick={() => onFilterChange("search", "")}
              />
            </Badge>
          )}
          {filters.propertyType !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs px-2 py-0.5">
              Tipo: {filters.propertyType}
              <X
                className="h-3 w-3 cursor-pointer hover:text-red-500"
                onClick={() => onFilterChange("propertyType", "all")}
              />
            </Badge>
          )}
          {filters.priceRange !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs px-2 py-0.5">
              Preço: {filters.priceRange}
              <X
                className="h-3 w-3 cursor-pointer hover:text-red-500"
                onClick={() => onFilterChange("priceRange", "all")}
              />
            </Badge>
          )}
          {filters.bedrooms !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs px-2 py-0.5">
              {filters.bedrooms}+ quartos
              <X
                className="h-3 w-3 cursor-pointer hover:text-red-500"
                onClick={() => onFilterChange("bedrooms", "all")}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Results Counter Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
          <span>
            Mostrando <strong className="text-foreground">{filteredCount}</strong> de{" "}
            <strong>{totalCount}</strong> imóveis
          </span>
        </div>
        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="text-primary hover:underline font-medium text-xs"
          >
            Redefinir filtros
          </button>
        )}
      </div>
    </div>
  )
}
