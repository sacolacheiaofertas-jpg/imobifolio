import { Inquiry } from "@/payload-types"
import { CollectionSlug } from "payload"
import { BaseRepository } from "../base-repository"
import { BaseDecorator } from "../base-decorator"

export class InquiryRepository extends BaseRepository<Inquiry, InquiryDecorator> {
  override collection: CollectionSlug = "inquiries"
  override DecoratorClass = InquiryDecorator
}

export class InquiryDecorator extends BaseDecorator<Inquiry> {}
