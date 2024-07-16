// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Profile } from '@/types';

export type RetrieveResponse = {
  url: string;
  tag: Profile;
  destination: string;
};

export function retrieveApiRequest(): Promise<Response> {
  return fetch('/api/retrieve', { method: 'GET' });
}

export default async function handler(
  _req: NextApiRequest,
  _res: NextApiResponse<RetrieveResponse[]>,
) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${serverUrl}/retrieve`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  console.log('Retrieve: ', json);
  _res.status(200).json(json);
}
