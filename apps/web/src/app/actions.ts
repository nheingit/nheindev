'use server'

import { z } from 'zod'
import { formSchema } from './_utilities/zodSchema'

type Inputs = z.infer<typeof formSchema>

export async function submitEmailForm(formId: string, form: Inputs) {
  try {
    const response = await fetch(`http://localhost:3000/api/form-submissions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: formId,
          submissionData: form
        })
    })
  } catch(e) {
    console.error(e)
  }
}
