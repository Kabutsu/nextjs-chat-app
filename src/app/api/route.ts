import Ably from 'ably/promises';

export async function GET(_req: Request) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY as string);
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ably-nextjs-demo', timestamp: Date.now() });
  return Response.json(tokenRequestData);
};
