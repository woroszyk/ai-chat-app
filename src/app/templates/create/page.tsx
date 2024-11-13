"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';
import { useTemplates, type FormField } from '../../../hooks/useTemplates';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function CreateTemplatePage() {
  const router = useRouter();
  const { addTemplate } = useTemplates();
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    description: '',
    prompt: '',
    category: 'general',
    fields: [] as FormField[]
  });

  const addField = () => {
    setNewTemplate(prev => ({
      ...prev,
      fields: [...prev.fields, { id: Date.now().toString(), label: '', value: '' }]
    }));
  };

  const removeField = (id: string) => {
    setNewTemplate(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== id)
    }));
  };

  const updateField = (id: string, key: 'label' | 'value', value: string) => {
    setNewTemplate(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === id ? { ...field, [key]: value } : field
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplate.title || !newTemplate.prompt) return;

    addTemplate(newTemplate);
    setNewTemplate({
      title: '',
      description: '',
      prompt: '',
      category: 'general',
      fields: []
    });
    
    router.push('/templates');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Utwórz nowy szablon</h1>
          <Link 
            href="/templates"
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Powrót do szablonów
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tytuł szablonu
              </label>
              <input
                type="text"
                value={newTemplate.title}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Wprowadź tytuł szablonu"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opis
              </label>
              <input
                type="text"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Wprowadź opis szablonu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prompt bazowy (niewidoczny dla użytkownika)
              </label>
              <textarea
                value={newTemplate.prompt}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, prompt: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                placeholder="Wprowadź bazowy prompt"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategoria
              </label>
              <select
                value={newTemplate.category}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="general">Ogólne</option>
                <option value="business">Biznes</option>
                <option value="technical">Techniczne</option>
                <option value="creative">Kreatywne</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Pola formularza
                </label>
                <button
                  type="button"
                  onClick={addField}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <FaPlus className="w-4 h-4" />
                  <span>Dodaj pole</span>
                </button>
              </div>
              
              {newTemplate.fields.map(field => (
                <div key={field.id} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateField(field.id, 'label', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nazwa pola"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(field.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Utwórz szablon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}