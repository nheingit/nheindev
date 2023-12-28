'use server'

import { z } from 'zod'
import { formSchema } from './_utilities/zodSchema'

type Inputs = z.infer<typeof formSchema>

export async function submitEmailForm(data: Inputs) {
  try {
    // validate data again
    const result = formSchema.safeParse(data)
    if (result.success) {
        const response = await fetch(`http://localhost:3000/api/form-submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: result.data.email
        })
        return response.json;
    }
  // Submit data to Payload CMS backend
  } catch (error) {
    console.error(error)
  }
}
