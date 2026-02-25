import Link from 'next/link';
import { Sun } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sun className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">Solar India</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-orange-500 transition">
              Home
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-orange-500 transition">
              Categories
            </Link>
            <Link href="/locations" className="text-gray-700 hover:text-orange-500 transition">
              Locations
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-500 transition">
              About
            </Link>
            <Link href="/installers/signup" className="text-orange-600 hover:text-orange-700 font-medium transition">
              For Installers
            </Link>
            <Link href="/installers/dashboard" className="text-orange-600 hover:text-orange-700 font-medium transition">
              Installer Dashboard
            </Link>
            <Link href="/admin" className="text-orange-600 hover:text-orange-700 font-medium transition">
              Admin
            </Link>
          </nav>

          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
            Add Listing
          </button>
        </div>
      </div>
    </header>
  );
}
