import React from 'react';

type MessageProps = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Message({ role, content }: MessageProps) {
  return (
    <div className={`flex p-4 ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`
          rounded-lg p-4 max-w-[80%] break-words
          ${role === 'user' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}
        `}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}