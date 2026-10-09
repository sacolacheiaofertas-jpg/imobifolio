"use client"

import { Share2Icon, HeartIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProperty } from "../providers/property"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export const PropertyShare = () => {
  const property = useProperty()
  const [isCopied, setIsCopied] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const propertyId = String(property.id || "")

  // Verificar se o imóvel já está salvo no localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && propertyId) {
      try {
        const stored = localStorage.getItem("imobifolio_favorites")
        if (stored) {
          const list: string[] = JSON.parse(stored)
          setIsFavorite(list.includes(propertyId))
        }
      } catch (e) {
        console.error("Erro ao ler favoritos:", e)
      }
    }
  }, [propertyId])

  // Ação de Compartilhar
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    const title = property.title || "Imóvel no Imobifolio"
    const text = `Confira este imóvel: ${title} no Imobifolio!`

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
        return
      } catch (err) {
        // Usuário cancelou ou navegador não completou o share nativo
      }
    }

    // Fallback: copiar para a área de transferência
    try {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
      toast.success("Link do imóvel copiado para a área de transferência!")
      setTimeout(() => setIsCopied(false), 2500)
    } catch (err) {
      toast.error("Não foi possível copiar o link.")
    }
  }

  // Ação de Favoritar (Persiste no navegador do cliente)
  const handleToggleFavorite = () => {
    if (typeof window === "undefined" || !propertyId) return

    try {
      const stored = localStorage.getItem("imobifolio_favorites")
      let list: string[] = stored ? JSON.parse(stored) : []

      if (list.includes(propertyId)) {
        list = list.filter((id) => id !== propertyId)
        setIsFavorite(false)
        toast.info("Imóvel removido dos seus favoritos")
      } else {
        list.push(propertyId)
        setIsFavorite(true)
        toast.success("Imóvel salvo nos seus favoritos!")
      }

      localStorage.setItem("imobifolio_favorites", JSON.stringify(list))
    } catch (e) {
      console.error("Erro ao salvar favorito:", e)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        title="Compartilhar imóvel"
        className="gap-1.5 text-xs font-semibold h-9 px-3 rounded-xl border-border hover:bg-muted"
      >
        {isCopied ? (
          <>
            <CheckIcon className="h-4 w-4 text-green-600" />
            <span className="hidden sm:inline text-green-600">Copiado</span>
          </>
        ) : (
          <>
            <Share2Icon className="h-4 w-4 text-foreground/80" />
            <span className="hidden sm:inline">Compartilhar</span>
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleToggleFavorite}
        title={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        className={`gap-1.5 text-xs font-semibold h-9 px-3 rounded-xl border-border transition-colors ${
          isFavorite
            ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-900"
            : "hover:bg-muted text-foreground/80"
        }`}
      >
        <HeartIcon
          className={`h-4 w-4 transition-transform active:scale-125 ${
            isFavorite ? "fill-rose-500 text-rose-500" : "text-foreground/80"
          }`}
        />
        <span className="hidden sm:inline">
          {isFavorite ? "Salvo" : "Favoritar"}
        </span>
      </Button>
    </div>
  )
}
