import Head from 'next/head';
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('~/app/_components/Chat'), { ssr: false });

export default function Home() {
  return (
    <div className="container">
      <h1 className="title">Next.js Chat Demo</h1>
      <Chat />
    </div>
  );
};
