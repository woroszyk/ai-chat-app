"use client";

import { FaHome, FaComments, FaClipboard } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nagłówek */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="AI Assistant Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <span className="font-semibold text-lg">Asystent AI</span>
            </div>
            <div className="flex space-x-6">
              <Link 
                href="/"
                className="text-blue-600 flex items-center"
              >
                <FaHome className="w-5 h-5 mr-2" />
                Strona główna
              </Link>
              <Link 
                href="/chat"
                className="text-gray-600 flex items-center"
              >
                <FaComments className="w-5 h-5 mr-2" />
                Czat
              </Link>
              <Link 
                href="/templates"
                className="text-gray-600 flex items-center"
              >
                <FaClipboard className="w-5 h-5 mr-2" />
                Szablony
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero sekcja z animowanym gradientem */}
      <div className="relative h-[300px] sm:h-[400px] flex items-center justify-center overflow-hidden bg-gradient-animate">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="relative z-10 text-center -mt-8 sm:-mt-12 md:-mt-16">
          <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto -mb-6 sm:-mb-8 md:-mb-20">
            <Image
              src="/logo.png"
              alt="AI Assistant Logo"
              width={256}
              height={256}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">Asystent AI</h1>
        </div>
      </div>

      {/* Główna zawartość */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-12">Witaj w Asystent AI</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Karta Czatu */}
          <Link href="/chat" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaComments className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Czat AI</h3>
              <p className="text-gray-600">
                Rozpocznij rozmowę z naszym asystentem AI. Zadawaj pytania, prowadź dyskusje i otrzymuj spersonalizowane odpowiedzi.
              </p>
            </div>
          </Link>

          {/* Karta Szablonów */}
          <Link href="/templates" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaClipboard className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Szablony</h3>
              <p className="text-gray-600">
                Skorzystaj z gotowych szablonów do konkretnych zadań i analiz. Szybko i efektywnie uzyskaj potrzebne informacje.
              </p>
            </div>
          </Link>
        </div>
      </main>

      {/* Stopka */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto -mb-3">
            <Image
              src="/logo.png"
              alt="AI Assistant Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain mx-auto"
              priority
            />
          </div>
          <p className="text-gray-600 text-sm">
            © 2024 Karol Wiszowaty. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}