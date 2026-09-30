/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // Where src/lib/gogitcms.ts submits forms, when it isn't production
  readonly GOGITCMS_CONTENT_API?: string
  // For src/pages/api/now-playing.json.ts
  readonly LASTFM_USER?: string
  readonly LASTFM_API_KEY?: string
  readonly TRAKT_USER?: string
  readonly TRAKT_CLIENT_ID?: string
}
