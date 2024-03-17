import Ably from 'ably/promises';
import { headers } from 'next/headers';

export async function GET(req: Request) {
  const headersList = headers();
  const referer = headersList.get('referer');

  const clientId = referer ? new URL(referer).hostname : 'localhost';

  const client = new Ably.Realtime(process.env.ABLY_API_KEY as string);
  const tokenRequestData = await client.auth.createTokenRequest({ clientId, timestamp: Date.now() });
  
  return Response.json(tokenRequestData);
};
