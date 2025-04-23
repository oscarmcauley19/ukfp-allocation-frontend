import { z } from "zod";

export const configSchema = z.object({
  API_URL: z.string().url(),
});

export type ConfigSchema = z.infer<typeof configSchema>;
