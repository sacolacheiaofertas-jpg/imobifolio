// src/collections/Contacts.ts
import { CollectionConfig } from "payload"
import { propertyTypeOptions } from "../Properties/property-type-options"

export const Contacts: CollectionConfig = {
  slug: "contacts",
  labels: {
    singular: "Contact",
    plural: "Contacts",
  },
  admin: {
    defaultColumns: ["name", "email", "phone", "status", "totalMessages", "lastContact"],
    useAsTitle: "name",
    listSearchableFields: ["name", "email", "phone"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true, // Enforce unique emails
      index: true,
    },
    {
      name: "phone",
      type: "text",
      index: true,
    },
    {
      name: "preferredContact",
      type: "select",
      options: [
        { label: "Email", value: "email" },
        { label: "Phone", value: "phone" },
        { label: "Text", value: "text" },
      ],
    },
    // Contact Status & Management
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Qualified", value: "qualified" },
        { label: "Active Client", value: "active" },
        { label: "Closed", value: "closed" },
        { label: "Do Not Contact", value: "dnc" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "agents",
      label: "Assigned Agent",
      admin: {
        position: "sidebar",
      },
    },
    // Interest Profile
    {
      name: "profile",
      type: "group",
      label: "Contact Profile",
      fields: [
        {
          name: "buyingTimeline",
          type: "select",
          options: [
            { label: "Immediately", value: "immediately" },
            { label: "Within 3 months", value: "3-months" },
            { label: "Within 6 months", value: "6-months" },
            { label: "Within a year", value: "1-year" },
            { label: "Just browsing", value: "browsing" },
          ],
        },
        {
          name: "budgetRange",
          type: "group",
          fields: [
            {
              name: "min",
              type: "number",
              label: "Minimum Budget",
            },
            {
              name: "max",
              type: "number",
              label: "Maximum Budget",
            },
          ],
        },
        {
          name: "preferredAreas",
          type: "text",
          label: "Preferred Areas/Neighborhoods",
        },
        {
          name: "propertyTypes",
          type: "select",
          hasMany: true,
          options: propertyTypeOptions,
        },
      ],
    },

    // test
    {
      name: "json",
      type: "json",
    },
  ],
}
