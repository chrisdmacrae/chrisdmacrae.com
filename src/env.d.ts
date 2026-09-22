/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // Where src/lib/gogitcms.ts submits forms, when it isn't production
  readonly GOGITCMS_CONTENT_API?: string
}
