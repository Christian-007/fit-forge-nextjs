import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { AuthEntity } from '@/app/core/auth.entity';

export async function POST(req: NextRequest) {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_API_URL;

  if (!baseUrl) {
    throw new Error('baseUrl is not defined!');
  }

  const bodyRequest: AuthEntity = await req.json();

  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest),
    });
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Login failed' },
        { status: res.status }
      );
    }

    cookies().set('token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ success: true, status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Unexpected error happened.' },
      { status: 500 }
    );
  }
}
