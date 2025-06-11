import { NextRequest } from 'next/server';
import { httpHandler } from '@/app/api/proxy/[...path]/handler';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return httpHandler(req, params.path);
}

export async function PATCH(req: NextRequest, { params }: { params: { path: string[] } }) {
  return httpHandler(req, params.path);
}
