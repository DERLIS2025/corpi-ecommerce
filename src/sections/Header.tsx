import { Menu, Phone, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { categories } from '@/data/products';
import { SearchBar } from '@/components/SearchBar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { WHATSAPP_NUMBER } from '@/utils/whatsapp';
import type { View } from '@/types';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onCategorySelect: (categoryId: string | null) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Header({
  currentView,
  onViewChange,
  onCategorySelect,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: 'Inicio', view: 'home' as View },
      { label: 'Catálogo', view: 'catalog' as View },
      { label: 'Servicios', view: 'home' as View, sectionId: 'servicios' },
      { label: 'Contacto', view: 'home' as View, sectionId: 'contacto' },
    ],
    []
  );

  const handleNavAction = (view: View, sectionId?: string) => {
    onViewChange(view);
    setMobileMenuOpen(false);

    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="bg-green-800 text-green-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:text-sm">
          <p className="font-medium">Soluciones para tu jardín en todo Paraguay</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" />
            +595 992 588 770
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4">
          <button onClick={() => onViewChange('home')} className="text-left">
            <p className="text-2xl font-black tracking-tight text-green-800">Corpicia</p>
            <p className="-mt-1 text-xs font-medium text-muted-foreground">Paisajismo & Jardinería</p>
          </button>

          <div className="hidden md:block">
            <SearchBar value={searchQuery} onChange={onSearchChange} />
          </div>

          <div className="hidden md:block">
            <WhatsAppButton
              message="Hola, quiero solicitar un presupuesto para mi jardín. ¿Me pueden ayudar?"
              label="Solicitar presupuesto"
            />
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="ml-auto rounded-lg border border-border p-2 md:hidden"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="mt-4 md:hidden">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>

      <div className="border-t border-border bg-[#f8fbf8]">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={() => {
              onCategorySelect(null);
              onViewChange('catalog');
            }}
            className="whitespace-nowrap rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:border-green-200 hover:text-green-700"
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onCategorySelect(category.id);
                onViewChange('catalog');
              }}
              className="whitespace-nowrap rounded-full border border-transparent px-4 py-1.5 text-sm font-medium text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-white px-4 py-4 md:hidden">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavAction(item.view, item.sectionId)}
                className={`block w-full rounded-lg px-4 py-2 text-left text-sm font-medium ${
                  currentView === item.view ? 'bg-green-50 text-green-700' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
