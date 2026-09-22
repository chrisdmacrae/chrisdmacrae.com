// Submits the forms declared in go-git-cms.yml to Go·Git CMS's content API,
// which validates each submission against that declaration and files it under
// Forms in the CMS.
//
// Set GOGITCMS_CONTENT_API to send submissions somewhere other than production,
// like the API `npx @gogitcms/editor dev --local` serves.
const CONTENT_API =
  import.meta.env.GOGITCMS_CONTENT_API ??
  'https://app.gogitcms.com/api/content/v1/chrisdmacrae/chrisdmacrae.com'

export type FormError = {
  // The name of the field it's about
  path: string
  message: string
}

export type FormResult =
  | { status: 'sent' }
  | { status: 'invalid', errors: FormError[] }
  | { status: 'rate-limited' }
  | { status: 'failed' }

export type Visitor = {
  ip?: string
  userAgent?: string | null
}

export async function submitForm(form: string, data: Record<string, unknown>, visitor: Visitor = {}): Promise<FormResult> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }

  // The CMS rate limits by the first X-Forwarded-For hop, and keeps it and the
  // user agent for spotting spam. Without these, every submission would look
  // like it came from this server.
  if (visitor.ip) headers['X-Forwarded-For'] = visitor.ip
  if (visitor.userAgent) headers['User-Agent'] = visitor.userAgent

  try {
    const response = await fetch(`${CONTENT_API}/forms/${form}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10_000)
    })

    // A submission is answered with { ok, errors }: 200 when it's accepted,
    // 422 when it fails validation. Anything else is an API error.
    if (response.status === 200 || response.status === 422) {
      const result: { ok: boolean, errors: FormError[] } = await response.json()
      return result.ok ? { status: 'sent' } : { status: 'invalid', errors: result.errors }
    }
    if (response.status === 429) return { status: 'rate-limited' }

    console.error(`Go·Git CMS refused the "${form}" form (${response.status}): ${await response.text()}`)
  } catch (error) {
    console.error(`Couldn't submit the "${form}" form to Go·Git CMS`, error)
  }

  return { status: 'failed' }
}
