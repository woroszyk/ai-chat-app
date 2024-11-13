import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between h-16">
                    <Link href="/" className="text-xl font-bold text-gray-800">
                        AI Chat App
                    </Link>
                    
                    <div className="flex gap-4">
                        <Link 
                            href="/chat"
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                pathname === '/chat' 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            Chat
                        </Link>
                        <Link 
                            href="/templates"
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                pathname.startsWith('/templates')
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            Szablony
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}