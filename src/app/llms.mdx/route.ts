import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const revalidate = false

export async function GET(req: NextRequest) {
  // Redirect root /llms.mdx to /docs to avoid a mismatch with the dynamic route.
  return NextResponse.redirect(new URL('/docs', req.url))
}
