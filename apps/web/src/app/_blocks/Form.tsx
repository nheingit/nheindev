"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"

import { Button, Form as FormWrapper, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input} from "@repo/ui"
import { submitEmailForm } from "../actions"
import { Page } from "../../payload-types"
import type { Form } from "../../payload-types"
import { formSchema } from "../_utilities/zodSchema"



type Props = Extract<Page['layout'][0], { blockType: 'formBlock' }>
type Inputs = z.infer<typeof formSchema>

export const FormBlock: React.FC<Props> = ({form, description}) => {
    const { submitButtonLabel, id} = form as Form
    const formMethods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "default@example.com",
        },

    })
    const onSubmit: SubmitHandler<Inputs> = async data => {
      // pass the ID to the action since we need it to submit in the payload request
      const submitEmail = submitEmailForm.bind(null, id)
      // format the data prior to sending
      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }))
      await submitEmail(dataToSend)
      formMethods.reset()
    }
    return (
    <FormWrapper {...formMethods}>
      <form id={id} onSubmit={formMethods.handleSubmit((data) => onSubmit(data))} className="space-y-8">
        <FormField
          control={formMethods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={formMethods.control._defaultValues.email || "email"} {...field} />
              </FormControl>
              {description && 
                <FormDescription>
                    {description}
                </FormDescription>
              }
              <FormMessage />
            </FormItem>
          )}
        />
        <Button form={id} type="submit">{submitButtonLabel}</Button>
      </form>
    </FormWrapper>
    )
}
