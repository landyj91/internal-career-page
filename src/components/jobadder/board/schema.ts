import { z } from "zod"

export const jobBoardSchema = z.object({
    adId: z.number(),
    title: z.string(),
    reference: z.string(),
    summary: z.string(),
    description: z.string(),
    bulletPoints: z.string().optional().array(),
    postedAt: z.string(),
    expiresAt: z.string(),
    company: z.string(),
    category: z.string(),
    subcategory: z.string(),
    location: z.string(),
    worktype: z.string(),
})

export type JobBoard = z.infer<typeof jobBoardSchema>