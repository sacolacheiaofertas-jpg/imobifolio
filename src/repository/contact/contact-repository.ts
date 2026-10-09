import { Contact } from "@/payload-types"
import { CollectionSlug } from "payload"
import { BaseRepository } from "../base-repository"
import { BaseDecorator } from "../base-decorator"

export class ContactRepository extends BaseRepository<Contact, ContactDecorator> {
  override collection: CollectionSlug = "contacts"
  override DecoratorClass = ContactDecorator
}

export class ContactDecorator extends BaseDecorator<Contact> {}
