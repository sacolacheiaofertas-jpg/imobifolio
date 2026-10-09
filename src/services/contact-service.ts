import { PropertyInquirySchema } from "@/forms/property-inquiry/schema"
import { local } from "@/repository"

export class ContactService {
  async processLead({ propertyId, agentId, ...message }: PropertyInquirySchema) {
    console.log("Processing lead for property:", propertyId, "with message:", message)
    try {
      // Step 1: Find or create contact
      const contact = await local.contact.findOrCreate({ ...message, assignedTo: agentId }, "email")
      const inquiry = await local.inquiry.create({
        ...message,
        contact: contact.id,
        property: propertyId,
      })
      return {
        contact,
        inquiry,
      }
    } catch (error) {
      console.error("Error processing lead:", error)
      throw error
    }
  }
}

export const TestModule = {
  message: "Hello",
}
