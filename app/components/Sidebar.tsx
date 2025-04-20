import { useState } from 'react';
import { Link } from '@remix-run/react';

type Conversation = {
  id: string;
  title: string;
  messages: any[];
  createdAt: number;
};

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
  conversations?: Conversation[];
  onNewChat?: () => void;
  onSelectChat?: (id: string) => void;
};

export default function Sidebar({ 
  isOpen, 
  toggleSidebar, 
  conversations = [], 
  onNewChat = () => {}, 
  onSelectChat = () => {} 
}: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed md:static top-0 left-0 bottom-0 
          flex flex-col 
          w-64 bg-gray-900 text-white
          transform transition-transform duration-300 ease-in-out z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:z-0
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">DeepSeek Chat</h2>
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md hover:bg-gray-700"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <button 
              className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-800"
              onClick={onNewChat}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Chat
              </div>
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Previous chats</h3>
            
            {conversations.length > 0 ? (
              <div className="space-y-1">
                {conversations
                  .sort((a, b) => b.createdAt - a.createdAt) // Sort by most recent
                  .map((chat) => (
                    <button 
                      key={chat.id} 
                      className="w-full text-left p-3 rounded-md hover:bg-gray-800 flex items-center truncate"
                      onClick={() => onSelectChat(chat.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span className="truncate">{chat.title}</span>
                    </button>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No previous chats</p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <Link 
            to="/settings" 
            className="w-full text-left p-3 rounded-md hover:bg-gray-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
        </div>
      </div>
    </>
  );
}