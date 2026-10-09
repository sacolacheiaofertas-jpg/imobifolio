import { AgentRepository } from "./agent/agent-repository"
import { ContactRepository } from "./contact/contact-repository"
import { InquiryRepository } from "./inquiry/inquiry-repository"
import { LocationRepository } from "./location/location-repository"
import { PropertyRepository } from "./property/property-repository"
import { UserRepository } from "./user/user-repository"

export const local = {
  property: new PropertyRepository(),
  contact: new ContactRepository(),
  inquiry: new InquiryRepository(),
  user: new UserRepository(),
  agent: new AgentRepository(),
  location: new LocationRepository(),
}
