import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_API_URL;

  if (!baseUrl) {
    throw new Error('baseUrl is not defined!');
  }

  const token = cookies().get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errResponseBody = await res.json().catch(() => {});
      return NextResponse.json(
        { success: false, message: errResponseBody.message || 'Logout failed' },
        { status: res.status }
      );
    }

    cookies().delete('token');
    return NextResponse.json({ success: true, status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Unexpected error happened.' },
      { status: 500 }
    );
  }
}
