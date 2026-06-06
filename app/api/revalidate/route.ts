import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { _type } = body

    if (_type === 'post') {
      revalidatePath('/blog', 'page')
      revalidatePath('/blog/[slug]', 'page')
    } else if (_type === 'caseStudy') {
      revalidatePath('/case-studies', 'page')
      revalidatePath('/case-studies/[slug]', 'page')
    } else {
      revalidatePath('/', 'page')
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
