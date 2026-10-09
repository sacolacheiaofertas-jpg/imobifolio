"use client" // this is a Client Component

import { zodResolver } from "@hookform/resolvers/zod"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks"
import { Button } from "@/components/ui/button"
import { propertyInquiryAction } from "./action"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { schema } from "./schema"
import { toast } from "sonner"
import { useProperty } from "@/components/providers/property"
import { faker } from "@faker-js/faker"

export function PropertyInquiryForm() {
  const property = useProperty()

  const getDefaultValues = (addFaker: boolean = false) => {
    const defaultMessage = `Hello,\n\nI am interested in the property "${property.address.full_address}".\n\nPlease let me know how I can proceed with the inquiry.\n\nThank you!`
    const agent = property.agent
    return {
      name: addFaker ? faker.person.fullName() : "",
      email: addFaker ? (faker.internet.username() + "@example.com").toLocaleLowerCase() : "",
      message: addFaker ? defaultMessage : "",
      phone: addFaker ? faker.phone.number() : "",
      propertyId: property.id,
      agentId: agent.id,
    }
  }

  const { form, handleSubmitWithAction } = useHookFormAction(
    propertyInquiryAction,
    zodResolver(schema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: getDefaultValues(),
      },
      actionProps: {
        onError: ({ error }) => {
          toast.error("Message failed to send", {
            description: error.serverError,
            duration: 3000,
          })
        },
        onSuccess: () => {
          toast("Message sent!", {
            description: "Your message has been sent to the agent.",
            duration: 3000,
          })
          // resetFormAndAction()
          form.reset({
            name: "",
            email: "",
            message: "",
            phone: "",
          })
        },
      },
    },
  )

  return (
    <form onSubmit={handleSubmitWithAction} className="flex flex-1 w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        {form.formState.errors.propertyId ? (
          <p className="text-red-500 bg-red-50 py-1 px-2 rounded text-sm">
            {form.formState.errors.propertyId.message}
          </p>
        ) : null}
        {form.formState.errors.name ? (
          <p className="text-red-500 bg-red-50 py-1 px-2 rounded text-sm">
            {form.formState.errors.name.message}
          </p>
        ) : null}
        {form.formState.errors.email ? (
          <p className="text-red-500 bg-red-50 py-1 px-2 rounded text-sm">
            {form.formState.errors.email.message}
          </p>
        ) : null}
        {form.formState.errors.phone ? (
          <p className="text-red-500 bg-red-50 py-1 px-2 rounded text-sm">
            {form.formState.errors.phone.message}
          </p>
        ) : null}
        {form.formState.errors.message ? (
          <p className="text-red-500 bg-red-50 py-1 px-2 rounded text-sm">
            {form.formState.errors.message.message}
          </p>
        ) : null}
      </div>
      <Input placeholder="Enter your name" {...form.register("name")} />
      <Input placeholder="Enter your email" {...form.register("email")} />
      <Input placeholder="Enter your phone" {...form.register("phone")} />
      <Textarea placeholder="Enter your message" {...form.register("message")} />

      <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
        Send
      </Button>

      <Button
        type="button"
        variant={"link"}
        size={"sm"}
        onClick={() => {
          form.reset(getDefaultValues(true))
        }}
      >
        generate test data
      </Button>
    </form>
  )
}
