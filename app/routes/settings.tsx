import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: "Settings - DeepSeek Chat" },
    { name: "description", content: "DeepSeek Chat Settings" },
  ];
};

export default function Settings() {
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  
  // Simulate loading saved settings
  useEffect(() => {
    const savedSettings = localStorage.getItem('chat_settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setTemperature(parsed.temperature || 0.7);
      setMaxTokens(parsed.maxTokens || 1000);
    }
  }, []);

  // Save settings to localStorage when they change
  const saveSettings = () => {
    localStorage.setItem('chat_settings', JSON.stringify({
      temperature,
      maxTokens
    }));
    
    // Show a temporary success message
    const saveMessage = document.getElementById('save-message');
    if (saveMessage) {
      saveMessage.classList.remove('opacity-0');
      setTimeout(() => {
        saveMessage.classList.add('opacity-0');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow px-4 py-4 flex items-center">
        <Link 
          to="/" 
          className="mr-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">AI Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Temperature: {temperature}
              </label>
              <input 
                id="temperature"
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Lower values make responses more focused and deterministic. Higher values make output more random and creative.
              </p>
            </div>
            
            <div>
              <label htmlFor="max-tokens" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Tokens: {maxTokens}
              </label>
              <input 
                id="max-tokens"
                type="range" 
                min="100" 
                max="4000" 
                step="50"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                The maximum number of tokens to generate in the completion. Longer values may result in more detailed responses but take longer to generate.
              </p>
            </div>
            
            <div className="pt-4 flex justify-end">
              <span id="save-message" className="mr-4 text-green-600 self-center transition-opacity opacity-0">
                Settings saved!
              </span>
              <button
                onClick={saveSettings}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}