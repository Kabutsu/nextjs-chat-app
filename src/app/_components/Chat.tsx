'use client'

import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';

import ChatBox from '~/app/_components/ChatBox';

export default function Chat() {
  const client = new Ably.Realtime.Promise({ authUrl: '/api' })

  return (
    <AblyProvider client={ client }>
      <ChatBox />
    </AblyProvider>
  );
};
