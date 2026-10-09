"use client"

import { useState, useEffect, useCallback } from "react"
import { useProperty } from "@/components/providers/property"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Images,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const PropertyGallery = () => {
  const property = useProperty()
  const rawImages = property.photos
  const images = rawImages.filter((img) => !!img.url)

  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsZoomed(false)
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
    setIsZoomed(false)
    document.body.style.overflow = ""
  }, [])

  const nextImage = useCallback(() => {
    setIsZoomed(false)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setIsZoomed(false)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation (Escape, Left, Right)
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closeLightbox, nextImage, prevImage])

  // Touch gesture support (swipe on mobile)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }
  }

  if (images.length === 0) return null

  const featureImage = images[0]
  const secondaryImages = images.slice(1, 5)

  return (
    <>
      {/* Property Photo Grid (Airbnb Style) */}
      <div className="relative w-full max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden max-h-[380px] sm:max-h-[460px] md:max-h-[520px]">
          {/* Main big image */}
          <div
            className="md:col-span-2 relative aspect-[4/3] md:aspect-auto md:h-full cursor-pointer overflow-hidden group"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={featureImage.url!}
              alt={featureImage.alt || property.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Secondary 4 grid images (Desktop & Tablet) */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
            {secondaryImages.map((img, idx) => {
              const actualIndex = idx + 1
              return (
                <div
                  key={img.id || actualIndex}
                  className="relative aspect-[4/3] h-full cursor-pointer overflow-hidden group"
                  onClick={() => openLightbox(actualIndex)}
                >
                  <Image
                    src={img.url!}
                    alt={img.alt || `Foto ${actualIndex + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              )
            })}
          </div>
        </div>

        {/* View All Photos Button */}
        <Button
          onClick={() => openLightbox(0)}
          className="absolute bottom-7 right-7 bg-background/90 hover:bg-background text-foreground backdrop-blur-md shadow-lg border border-border/80 flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold"
        >
          <Images className="h-4 w-4 text-primary" />
          <span>Ver todas as {images.length} fotos</span>
        </Button>
      </div>

      {/* Modern Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between backdrop-blur-md transition-all select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-4 text-white z-20 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm sm:text-base">
                {currentIndex + 1} / {images.length}
              </span>
              <span className="hidden sm:inline text-white/50">•</span>
              <span className="hidden sm:inline text-sm text-white/80 line-clamp-1">
                {property.title} — {property.address?.city}, {property.address?.state_abbr}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                className="p-2 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors"
                title={isZoomed ? "Reduzir" : "Ampliar"}
              >
                {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
              </button>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors"
                title="Fechar (Esc)"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Main Photo Display */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-8 overflow-hidden">
            {/* Prev Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 sm:left-6 z-20 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 backdrop-blur-sm transition-transform active:scale-95"
                title="Foto anterior (Seta esquerda)"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            )}

            {/* Current Image */}
            <div
              className={`relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center transition-transform duration-300 ${
                isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              <Image
                src={images[currentIndex].url!}
                alt={images[currentIndex].alt || `Foto ${currentIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 sm:right-6 z-20 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 backdrop-blur-sm transition-transform active:scale-95"
                title="Próxima foto (Seta direita)"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="p-3 sm:p-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex gap-2 overflow-x-auto justify-center max-w-4xl mx-auto py-1 scrollbar-thin">
              {images.map((img, idx) => (
                <button
                  type="button"
                  key={img.id || idx}
                  onClick={() => {
                    setCurrentIndex(idx)
                    setIsZoomed(false)
                  }}
                  className={`relative w-14 h-10 sm:w-20 sm:h-14 rounded-md overflow-hidden shrink-0 transition-all border-2 ${
                    idx === currentIndex
                      ? "border-primary scale-105 shadow-md opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img.url!}
                    alt={`Miniatura ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
