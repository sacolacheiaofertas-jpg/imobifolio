"use client"
import { useProperty } from "../providers/property"

export const PropertyAddress = () => {
  const property = useProperty()
  if (!property.address) {
    return null
  }
  //<span className="font-semibold">5325 Roberts Rd</span>, Corryton, TN 37721
  return (
    <div>
      <span className="font-semibold">{property.address.street}</span>,{" "}
      <span>{property.address.city}</span>, <span>{property.address.state_abbr}</span>{" "}
      <span>{property.address.zip}</span>
    </div>
  )
}
