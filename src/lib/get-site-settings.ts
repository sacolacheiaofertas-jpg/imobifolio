import { getPayloadClient } from "@/db/client"

export interface SiteSettingsData {
  siteName: string
  tagline?: string
  logo?: any
  creci?: string
  whatsappNumber: string
  whatsappDefaultMessage?: string
  primaryPhone?: string
  contactEmail?: string
  address?: string
  primaryColor?: string
}

export const defaultSiteSettings: SiteSettingsData = {
  siteName: "Imobifolio",
  tagline: "Imóveis Exclusivos e de Alto Padrão",
  creci: "CRECI 12345-J",
  whatsappNumber: "5511999998888",
  whatsappDefaultMessage: "Olá! Vi o site e gostaria de mais informações sobre os imóveis disponíveis.",
  primaryPhone: "(11) 99999-8888",
  contactEmail: "contato@imobifolio.com.br",
  address: "São Paulo - SP, Brasil",
  primaryColor: "#B8860B",
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({
      slug: "site-settings" as any,
    })

    if (!settings) return defaultSiteSettings

    return {
      siteName: settings.siteName || defaultSiteSettings.siteName,
      tagline: settings.tagline || defaultSiteSettings.tagline,
      logo: settings.logo,
      creci: settings.creci || defaultSiteSettings.creci,
      whatsappNumber: settings.whatsappNumber || defaultSiteSettings.whatsappNumber,
      whatsappDefaultMessage: settings.whatsappDefaultMessage || defaultSiteSettings.whatsappDefaultMessage,
      primaryPhone: settings.primaryPhone || defaultSiteSettings.primaryPhone,
      contactEmail: settings.contactEmail || defaultSiteSettings.contactEmail,
      address: settings.address || defaultSiteSettings.address,
      primaryColor: settings.primaryColor || defaultSiteSettings.primaryColor,
    }
  } catch (error) {
    console.error("Error fetching site settings global:", error)
    return defaultSiteSettings
  }
}
