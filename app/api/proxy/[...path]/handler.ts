import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function httpHandler(req: NextRequest, path: string[]) {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_API_URL;

  if (!baseUrl) {
    throw new Error('baseUrl is not defined!');
  }

  const token = cookies().get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const backendPath = path.join('/');
  const apiUrl = `${baseUrl}/${backendPath}`;
  const queryParams = req.nextUrl.search;

  try {
    const [reqBody, errGetReqBody] = await getRequestBody(req);
    if (errGetReqBody) {
      return NextResponse.json(
        { success: false, message: errGetReqBody.message || 'Unexpected error happened.' },
        { status: 500 }
      );
    }

    const res = await fetch(`${apiUrl}${queryParams}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody),
    });
    const data = await getResponseBody(res);
    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || `Failed ${req.method} request.` },
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

async function getRequestBody(req: NextRequest): Promise<[BodyInit | undefined, Error | null]> {
  let body: BodyInit | undefined = undefined;
  let error: Error | null = null;
  const rawBody = await req.text();
  const hasRequestBody = !!rawBody.trim();

  if (hasRequestBody) {
    try {
      body = JSON.parse(rawBody);
    } catch (e: any) {
      error = e;
    }
  }

  return [body, error];
}

async function getResponseBody(res: Response): Promise<any | undefined> {
  let result: any = {};
  const rawBody = await res.text();
  const hasResponseBody = !!rawBody.trim();

  if (hasResponseBody) {
    try {
      result = JSON.parse(rawBody);
    } catch (e: any) {
      result = {};
    }
  }

  return result;
}
