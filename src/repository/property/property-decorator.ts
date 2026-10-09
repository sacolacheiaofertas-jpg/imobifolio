import { Media, Property, Agent, Feature } from "@/payload-types"
import { formatPrice } from "@/lib/format-price"
import { ListingStatus } from "@/config/collections/Properties/listing-status-map"
import { generateUrl } from "./generate-url"
import { BaseDecorator } from "../base-decorator"

type PropertyPhoto = {
  id: Media["id"]
  url: Media["url"]
  alt: Media["alt"]
}

export class PropertyDecorator extends BaseDecorator<Property> {
  get id(): Property["id"] {
    return this.original.id
  }

  get title(): Property["title"] {
    return this.original.title
  }

  get description(): Property["description"] {
    return this.original.description
  }

  get url(): string {
    return generateUrl(this.original)
  }

  get features(): Feature[] {
    if (!this.original.features) return []
    const features = this.original.features as Feature[]
    return features
  }

  get price(): string {
    return formatPrice(this.original.price)
  }

  get address(): Property["address"] {
    return this.original.address
  }

  get photos(): PropertyPhoto[] {
    const photoData = (this.original.photos ?? []) as Media[]
    const photos = photoData
      .filter((p) => !!p.url)
      .map((photo) => {
        return {
          id: photo.id,
          url: photo.url,
          alt: photo.alt,
        }
      })

    return photos
  }

  get details() {
    return {
      bedrooms: this.original.details?.bedrooms ?? 0,
      bathrooms: this.original.details?.bathrooms ?? 0,
      squareFeet: this.original.details?.squareFeet?.toLocaleString() ?? "0",
      lotSize: this.original.details?.lotSize?.toLocaleString() ?? "0",
      yearBuilt: this.original.details?.yearBuilt ?? 0,
      Property: this.original.details?.propertyType,
      heatingType: this.original.details?.heatingType,
    }
  }

  get listingStatus(): ListingStatus {
    return this.original.listingStatus
  }
  get agent(): Agent {
    return this.original.agent as Agent
  }
}
