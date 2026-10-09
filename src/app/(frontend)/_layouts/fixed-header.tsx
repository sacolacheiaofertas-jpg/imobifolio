"use client"

import { useState, useEffect } from "react"
import { Header } from "./header"
import type { SiteSettingsData } from "@/lib/get-site-settings"

interface FixedHeaderProps {
  settings?: SiteSettingsData
}

export const FixedHeader = ({ settings }: FixedHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`desktop:fixed top-0 left-0 right-0 z-50 py-2 px-4 desktop:px-0 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border/50" : "bg-transparent"
      }`}
    >
      <Header settings={settings} />
    </div>
  )
}
