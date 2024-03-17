import React, { useEffect, useState } from 'react';
import { useChannel } from "ably/react";
import { Types } from 'ably';

import styles from './ChatBox.module.css';

const ChatBox = () => {
  let inputBox: HTMLTextAreaElement | null;
  let messageEnd: HTMLDivElement | null;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<Types.Message>>([]);
  
  const isMessageEmpty = !message.trim().length;

  useEffect(() => {
    if (messageEnd) {
      messageEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const { channel, ably } = useChannel('chat-demo', (message) => {
    const history = messages.slice(-99);
    setMessages([...history, message]);
  });

  const sendChatMessage = (text: string) => {
    channel.publish({ name: 'chat-message', data: text });
    setMessage('');
    inputBox?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isMessageEmpty) {
      sendChatMessage(message);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !isMessageEmpty) {
      sendChatMessage(message);
      e.preventDefault();
    }
  };

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages.map((message, index) => (
          <span
            key={index}
            className={styles.message}
            data-author={message.clientId === ably?.auth.clientId ? 'me' : 'other'}
          >
            {message.data}
          </span>
        ))}
        <div ref={(element) => { messageEnd = element; }} />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          ref={(element) => { inputBox = element; }}
          value={message}
          placeholder="Type a message..."
          onChange={e => setMessage(e.target.value)}
          onKeyDown={onKeyDown}
          className={styles.textarea}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={isMessageEmpty}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
