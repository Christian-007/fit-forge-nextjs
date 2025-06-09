import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_API_URL;

  if (!baseUrl) {
    throw new Error('baseUrl is not defined!');
  }

  const token = cookies().get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const backendPath = params.path.join('/');
  const apiUrl = `${baseUrl}/${backendPath}`;
  const queryParams = req.nextUrl.search;

  try {
    const res = await fetch(`${apiUrl}${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Failed GET request.' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, status: res.status, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Unexpected error happened.' },
      { status: 500 }
    );
  }
}
