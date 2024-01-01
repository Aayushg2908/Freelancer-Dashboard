import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.string().min(1),
  startDate: z.date().min(new Date(new Date().getTime() - 24 * 60 * 60 * 1000)),
  endDate: z.date().min(new Date()),
});
