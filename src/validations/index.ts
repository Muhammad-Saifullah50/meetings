import { z } from "zod"

export const joinMeetingSchema = z.object({
  url: z.string().min(2).max(200).optional(),
})

export const sheduleMeetingSchema = z.object({
  title: z.string().min(5).max(50).optional(),
  description: z.string().min(10).max(1000).optional(),
  date: z.coerce.date()
})

export function getMeetingSchema(type: string) {
  switch (type) {
    case "join":
      return joinMeetingSchema;
    case "schedule":
      return sheduleMeetingSchema;
    default: return sheduleMeetingSchema
  }
}