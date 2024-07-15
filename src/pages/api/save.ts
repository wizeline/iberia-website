// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Profile } from '@/types';

export function saveApiRequest(
  url: string,
  tag: Profile,
  destination: string,
): Promise<Response> {
  return fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify({ url, tag, destination }),
  });
}

export default async function handler(
  _req: NextApiRequest,
  _res: NextApiResponse<string>,
) {
  console.log('Body: ', JSON.parse(_req.body));
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${serverUrl}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: _req.body,
  });
  const text = await res.text();
  _res.status(200).send(text);
}
