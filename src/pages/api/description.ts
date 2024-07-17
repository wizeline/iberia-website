// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export function descriptionApiRequest(prompt: string): Promise<Response> {
  return fetch('/api/description', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
}

export default async function handler(
  _req: NextApiRequest,
  _res: NextApiResponse<string>,
) {
  console.log('Body: ', _req.body);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  try {
    const res = await fetch(`${serverUrl}/description`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: _req.body,
    });
    if (res.status === 200) {
      const text = await res.text();
      console.log('generate response', text);
      _res.status(200).send(text);
    } else {
      console.error('Error calling BE:', res.status, res.statusText);
      _res.status(500).send(JSON.stringify(res));
    }
  } catch (error: unknown) {
    console.error('Error:', error);
    _res.status(500).send(JSON.stringify(error));
  }
}
