'use client';

import { Search, MapPin, ChevronDown, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Location { id: string; city: string; state: string }

interface Props {
  onSearch: (query: string, location: string) => void;
  locations?: Location[];
}

export default function SearchBar({ onSearch, locations = [] }: Props) {
  const [query, setQuery] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter cities by what user types
  const filtered = cityInput.length === 0
    ? locations
    : locations.filter(l =>
        l.city.toLowerCase().includes(cityInput.toLowerCase()) ||
        l.state.toLowerCase().includes(cityInput.toLowerCase())
      );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function selectCity(city: string) {
    setSelectedCity(city);
    setCityInput(city);
    setOpen(false);
  }

  function clearCity() {
    setSelectedCity('');
    setCityInput('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(query, selectedCity || cityInput);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Service / company search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Solar installer, dealer, inverter..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800"
          />
        </div>

        {/* City dropdown */}
        <div className="relative" ref={dropdownRef}>
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search city (e.g. Mumbai, Pune...)"
            value={cityInput}
            onChange={(e) => {
              setCityInput(e.target.value);
              setSelectedCity('');
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800"
            autoComplete="off"
          />
          {/* Clear button */}
          {cityInput ? (
            <button type="button" onClick={clearCity} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          ) : (
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          )}

          {/* Dropdown list */}
          {open && filtered.length > 0 && (
            <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
              {filtered.slice(0, 30).map((loc) => (
                <li key={loc.id}>
                  <button
                    type="button"
                    onMouseDown={() => selectCity(loc.city)}
                    className="w-full text-left px-4 py-2.5 hover:bg-orange-50 flex items-center gap-3 transition"
                  >
                    <MapPin className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                    <span className="font-medium text-gray-800 text-sm">{loc.city}</span>
                    <span className="text-gray-400 text-xs ml-auto">{loc.state}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-medium text-base"
      >
        Search Directory
      </button>
    </form>
  );
}
