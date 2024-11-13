"use client";

import { useState, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'Nowa rozmowa',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setChats(prev => {
      const updated = [...prev, newChat];
      localStorage.setItem('chats', JSON.stringify(updated));
      return updated;
    });
    setCurrentChatId(newChat.id);
    return newChat;
  };

  const addMessageToChat = (chatId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    setChats(prev => {
      const updated = prev.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, {
              ...message,
              id: Date.now().toString(),
              timestamp: Date.now(),
            }],
            updatedAt: Date.now(),
          };
        }
        return chat;
      });
      localStorage.setItem('chats', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => {
      const updated = prev.filter(chat => chat.id !== chatId);
      localStorage.setItem('chats', JSON.stringify(updated));
      return updated;
    });
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  return {
    chats,
    currentChatId,
    setCurrentChatId,
    createNewChat,
    addMessageToChat,
    deleteChat,
  };
}