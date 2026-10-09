"use client"
import { PropertyDecorator } from "@/repository/property/property-decorator"
import { Property } from "@/payload-types"
import { createContext, useContext } from "react"

export const PropertyContext = createContext<Property | null>(null)

export const PropertyProvider = ({
  children,
  property,
}: {
  children: React.ReactNode
  property: Property
}) => {
  return <PropertyContext.Provider value={property}>{children}</PropertyContext.Provider>
}

export const useProperty = () => {
  const context = useContext(PropertyContext)
  if (!context) throw new Error("useProperty must be used within a PropertyProvider")
  return new PropertyDecorator(context)
}
