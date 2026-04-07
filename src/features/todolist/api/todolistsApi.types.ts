import z from "zod"

// export type Todolist = {
//   id: string
//   title: string
//   addedDate: string
//   order: number
// }

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({ local: true }),
  order: z.int(),
})

export type Todolist = z.infer<typeof todolistSchema>
