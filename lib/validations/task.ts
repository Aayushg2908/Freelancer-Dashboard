import { z } from "zod";

export const tasks = ["TODO", "DOING", "DONE"];

export const taskSchema = z.object({
  content: z.string().min(1).max(255),
  status: z.enum(["TODO", "DOING", "DONE"]),
});
