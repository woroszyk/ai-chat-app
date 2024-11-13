"use client";

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useChats } from '../../hooks/useChats';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { generateResponse } from '@/lib/gemini';

export default function ChatPage() {
  const { chats, currentChatId, setCurrentChatId, createNewChat, addMessageToChat, deleteChat } = useChats();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const selectedPrompt = localStorage.getItem('selectedPrompt');
    if (selectedPrompt) {
      setInput(selectedPrompt);
      localStorage.removeItem('selectedPrompt');
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const chatId = currentChatId || createNewChat().id;
    const userMessage = input;
    
    // Dodaj wiadomość użytkownika
    addMessageToChat(chatId, {
      role: 'user',
      content: userMessage,
    });

    setInput('');
    setIsLoading(true);

    try {
      // Generuj odpowiedź z Gemini
      const aiResponse = await generateResponse(userMessage);
      
      // Dodaj odpowiedź AI
      addMessageToChat(chatId, {
        role: 'assistant',
        content: aiResponse,
      });
    } catch (error) {
      // W przypadku błędu dodaj informację o błędzie
      addMessageToChat(chatId, {
        role: 'assistant',
        content: 'Przepraszam, wystąpił błąd podczas generowania odpowiedzi. Spróbuj ponownie później.',
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8 flex gap-4">
        {/* Lista czatów */}
        <div className="w-64 bg-white rounded-lg shadow-lg p-4">
          <button
            onClick={createNewChat}
            className="w-full bg-blue-600 text-white rounded-lg p-2 flex items-center justify-center mb-4 hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            Nowy czat
          </button>
          
          <div className="space-y-2">
            {chats.map(chat => (
              <div
                key={chat.id}
                className={`p-2 rounded-lg flex justify-between items-center cursor-pointer ${
                  chat.id === currentChatId ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => setCurrentChatId(chat.id)}
              >
                <span className="truncate">{chat.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-gray-200"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Okno czatu */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {currentChatId && chats.find(chat => chat.id === currentChatId)?.messages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
                  Generowanie odpowiedzi...
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 items-center border-t pt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Napisz wiadomość..."
              disabled={isLoading}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Wyślij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}