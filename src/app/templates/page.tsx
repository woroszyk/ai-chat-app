"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import { useTemplates, type Template } from '../../hooks/useTemplates';
import { FaClipboard, FaTrash, FaPaperPlane, FaPlus } from 'react-icons/fa';

const LANGUAGES = [
    'Polski',
    'English',
    'Deutsch',
    'Español',
    'Français',
    'Italiano',
    'Nederlands',
    'Português',
    'Русский',
    '中文',
    '日本語',
    '한국어'
];

export default function TemplatesPage() {
    const router = useRouter();
    const { templates, deleteTemplate } = useTemplates();
    const [selectedLanguage, setSelectedLanguage] = useState('Polski');
    const [templateFields, setTemplateFields] = useState<{ [key: string]: { [key: string]: string } }>({});

    useEffect(() => {
        const savedFields = localStorage.getItem('templateFields');
        if (savedFields) {
            setTemplateFields(JSON.parse(savedFields));
        }
    }, []);

    const updateTemplateFieldValue = (templateId: string, fieldId: string, value: string) => {
        setTemplateFields(prev => {
            const newFields = {
                ...prev,
                [templateId]: {
                    ...(prev[templateId] || {}),
                    [fieldId]: value
                }
            };
            localStorage.setItem('templateFields', JSON.stringify(newFields));
            return newFields;
        });
    };

    const getFieldValue = (templateId: string, fieldId: string) => {
        return templateFields[templateId]?.[fieldId] || '';
    };

    const handleSendToAI = (template: Template) => {
        const fieldsText = template.fields
            .map(field => `${field.label}: ${getFieldValue(template.id, field.id)}`)
            .filter(text => text.includes(': ') && !text.endsWith(': '))
            .join('\n');
        
        const finalPrompt = `${template.prompt}\n\nJęzyk: ${selectedLanguage}\n\n${fieldsText}`;
        
        setTemplateFields(prev => {
            const newFields = { ...prev };
            delete newFields[template.id];
            localStorage.setItem('templateFields', JSON.stringify(newFields));
            return newFields;
        });

        localStorage.setItem('selectedPrompt', finalPrompt);
        router.push('/chat');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Szablony promptów</h1>
                    <Link 
                        href="/templates/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <FaPlus className="w-4 h-4" />
                        Utwórz nowy szablon
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map(template => (
                        <div key={template.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                                    <FaClipboard className="w-5 h-5 text-purple-600" />
                                </div>
                                <span className="text-sm text-gray-500 capitalize">{template.category}</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Wybierz język
                                </label>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {LANGUAGES.map(lang => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </div>

                            {template.fields.map(field => (
                                <div key={field.id} className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label}
                                    </label>
                                    <input
                                        type="text"
                                        value={getFieldValue(template.id, field.id)}
                                        onChange={(e) => updateTemplateFieldValue(template.id, field.id, e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder={`Wprowadź ${field.label.toLowerCase()}`}
                                    />
                                </div>
                            ))}

                            <div className="flex justify-between items-center mt-4">
                                <button 
                                    onClick={() => handleSendToAI(template)}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                                >
                                    <FaPaperPlane className="w-4 h-4" />
                                    <span>Wyślij do AI</span>
                                </button>
                                <button 
                                    onClick={() => deleteTemplate(template.id)}
                                    className="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-gray-100"
                                >
                                    <FaTrash className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}