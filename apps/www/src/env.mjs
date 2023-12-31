import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    LAUNCHPAD_SLUG_ID_SDK_EXPERT: z.string(),
    LAUNCHPAD_SLUG_ID_FUNCTIONS: z.string(),
    LAUNCHPAD_SLUG_ID_WEBSITE_TO_VOICE: z.string(),
    LAUNCHPAD_SLUG_ID_TEXT_TO_SPEECH: z.string(),
    LAUNCHPAD_SLUG_ID_TODO_APP: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID:
      process.env.NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID,
    LAUNCHPAD_SLUG_ID_SDK_EXPERT: process.env.LAUNCHPAD_SLUG_ID_SDK_EXPERT,
    LAUNCHPAD_SLUG_ID_FUNCTIONS: process.env.LAUNCHPAD_SLUG_ID_FUNCTIONS,
    LAUNCHPAD_SLUG_ID_WEBSITE_TO_VOICE:
      process.env.LAUNCHPAD_SLUG_ID_WEBSITE_TO_VOICE,
    LAUNCHPAD_SLUG_ID_TEXT_TO_SPEECH:
      process.env.LAUNCHPAD_SLUG_ID_TEXT_TO_SPEECH,
    LAUNCHPAD_SLUG_ID_TODO_APP: process.env.LAUNCHPAD_SLUG_ID_TODO_APP,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
