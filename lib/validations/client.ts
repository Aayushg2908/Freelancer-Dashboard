import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  projects: z.string().min(0),
  country: z.string().min(1),
  referralSource: z.string().min(1),
});
