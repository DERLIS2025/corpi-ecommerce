import { useState } from 'react';
import { Leaf, ShoppingCart, Menu, X, Phone, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/store/CartContext';
import type { View } from '@/types';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onProductSelect?: (productId: string) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navItems = [
    { label: 'Inicio', view: 'home' as View },
    { label: 'Productos', view: 'catalog' as View },
    { label: 'Contacto', view: 'home' as View, action: () => {
      onViewChange('home');
      setTimeout(() => {
        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }},
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.action) {
      item.action();
    } else {
      onViewChange(item.view);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-green-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+595 992 588 770</span>
          </div>
          <div className="hidden sm:block">
            <span>Envío gratis en compras mayores a Gs. 500.000</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/595992588770" target="_blank" rel="noopener noreferrer" className="hover:underline">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onViewChange('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold text-green-800">CORPI</span>
              <span className="text-xs text-green-600 -mt-1">& Cía</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  currentView === item.view ? 'text-green-700' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-green-50 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            
            <button 
              onClick={() => onViewChange('cart')}
              className="relative p-2 hover:bg-green-50 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-green-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                  {totalItems}
                </Badge>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-green-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-green-100 bg-white">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-left py-3 px-4 rounded-lg hover:bg-green-50 text-gray-700 font-medium transition-colors"
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
