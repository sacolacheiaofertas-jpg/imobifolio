import { customPrimaryKey } from "@/config/helpers/custom-primary-key"
import { specializations } from "@/config/helpers/specializations"
import { stateOptions } from "@/config/helpers/state-options"
import type { CollectionConfig } from "payload"

export const Agents: CollectionConfig = {
  slug: "agents",
  admin: {
    useAsTitle: "full_name",
    defaultColumns: ["id", "full_name", "title", "contact_email"],
  },
  access: {
    read: () => true,
  },
  auth: true,
  fields: [
    ...customPrimaryKey,
    {
      name: "first_name",
      type: "text",
      label: "First Name",
    },
    {
      name: "last_name",
      type: "text",
      label: "Last Name",
    },
    {
      name: "full_name",
      type: "text",
      label: "Full Name",
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (!data) return null
            return `${data.first_name} ${data.last_name}`
          },
        ],
      },
    },
    {
      name: "initials",
      type: "text",
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (!data) return null
            return `${data.first_name.charAt(0)}${data.last_name.charAt(0)}`
          },
        ],
      },
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "contact_email",
      type: "email",
      label: "Contact Email",
    },
    {
      name: "title",
      type: "text",
      admin: {
        description: 'e.g., "Realtor", "Senior Agent", "Broker"',
      },
    },
    {
      name: "licenses",
      type: "array",
      fields: [
        {
          name: "license_number",
          type: "text",
        },
        {
          name: "state",
          type: "select",
          options: stateOptions,
        },
      ],
    },
    {
      name: "specializations",
      type: "select",
      hasMany: true,
      options: specializations,
    },
    {
      name: "profilePhoto",
      type: "upload",
      relationTo: "media",
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
  ],
}
