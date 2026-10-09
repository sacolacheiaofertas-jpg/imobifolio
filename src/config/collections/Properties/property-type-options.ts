export const propertyTypeMap = {
  "single-family": "Casa Residencial",
  "multi-family": "Casa em Condomínio",
  condo: "Apartamento",
  townhouse: "Sobrado",
  land: "Terreno / Lote",
  "mobile-home": "Studio / Loft",
  other: "Cobertura / Outro",
}
export type PropertyType = keyof typeof propertyTypeMap
export type PropertyTypeOption = {
  label: string
  value: PropertyType
}

export const propertyTypeOptions: PropertyTypeOption[] = Object.entries(propertyTypeMap).map(
  ([value, label]) => ({
    label,
    value: value as PropertyType,
  }),
)
