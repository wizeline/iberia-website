// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Engine } from '@/types';

type GenerateResponse = {
  imageData: string;
};

export function generateApiRequest(
  prompt: string,
  engine: Engine,
): Promise<Response> {
  return fetch('/api/generate', {
    method: 'POST',
    body: JSON.stringify({ prompt, engine }),
  });
}

export default async function handler(
  _req: NextApiRequest,
  _res: NextApiResponse<GenerateResponse>,
) {
  console.log('Body: ', _req.body);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  try {
    const res = await fetch(`${serverUrl}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: _req.body,
    });
    if (res.status === 200) {
      const text = await res.text();
      console.log('generate response', text);
      _res.status(200).send({ imageData: text });
    } else {
      console.error('Error calling BE:', res.status, res.statusText);
      _res.status(500).send({ imageData: JSON.stringify(res) });
    }
  } catch (error: unknown) {
    console.error('Error:', error);
    _res.status(500).send({ imageData: JSON.stringify(error) });
  }
  /*const openAIUrl = 'https://api.openai.com/v1/images/generations';
  try {
    const res = await fetch(openAIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: requestBody.prompt,
        n: 1,
        quality: 'hd',
        style: 'natural',
        size: '1792x1024',
      }),
    });
    const requestBody = JSON.parse(_req.body);
    console.log('Body: ', requestBody);
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await fetch(`${serverUrl}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: _req.body,
    });
    const json = await res.json();
    console.log(json);
    _res.status(200).send({ imageData: json.data[0].url });
  } catch (error: unknown) {
    console.error('Error:', error);
    _res.status(500).send({ imageData: JSON.stringify(error) });
  }*/
}
