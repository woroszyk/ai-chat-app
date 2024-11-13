"use client";

import { useState, useEffect } from 'react';

export interface FormField {
    id: string;
    label: string;
    value: string;
}

export interface Template {
    id: string;
    title: string;
    description: string;
    prompt: string;
    category: string;
    fields: FormField[];
    createdAt: number;
    updatedAt: number;
}

export function useTemplates() {
    const [templates, setTemplates] = useState<Template[]>([]);

    useEffect(() => {
        const savedTemplates = localStorage.getItem('templates');
        if (savedTemplates) {
            setTemplates(JSON.parse(savedTemplates));
        }
    }, []);

    const addTemplate = (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => {
        setTemplates(prev => {
            const newTemplate: Template = {
                ...template,
                id: Date.now().toString(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };
            const updated = [...prev, newTemplate];
            localStorage.setItem('templates', JSON.stringify(updated));
            return updated;
        });
    };

    const deleteTemplate = (id: string) => {
        setTemplates(prev => {
            const updated = prev.filter(template => template.id !== id);
            localStorage.setItem('templates', JSON.stringify(updated));
            return updated;
        });
    };

    return {
        templates,
        addTemplate,
        deleteTemplate,
    };
}