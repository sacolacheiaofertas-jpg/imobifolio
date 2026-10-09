import route from "@/lib/routes"
import { Property } from "@/payload-types"
import slugify from "slugify"

export const generateUrl = (data: Property): string => {
  const fullAddress = [
    data.address.street,
    data.address.city,
    data.address.state_abbr,
    data.address.zip,
  ].map((l) => slugify(`${l}`, { lower: true }))

  return route("property.show", {
    id: data.id,
    full_address: fullAddress.join("/"),
  })
}
