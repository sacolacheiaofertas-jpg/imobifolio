import React from "react"
import "@/styles/frontend.css"
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR" className="overflow-x-hidden">
      <body className="overflow-x-hidden min-h-screen w-full relative">
        <main className="overflow-x-hidden w-full">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
