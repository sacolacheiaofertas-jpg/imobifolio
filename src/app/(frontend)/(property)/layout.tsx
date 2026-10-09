import { Footer } from "../_layouts/footer"
import { Header } from "../_layouts/header"
import { getSiteSettings } from "@/lib/get-site-settings"

export default async function PropertyLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <div>
      <div className="bg-background border-b border-border/40">
        <Header settings={settings} />
      </div>
      <main>{children}</main>
      <Footer settings={settings} />
    </div>
  )
}
