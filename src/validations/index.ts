
import { z } from "zod"

export const meetingFormSchema = z.object({
  username: z.string().min(2).max(50),
})
