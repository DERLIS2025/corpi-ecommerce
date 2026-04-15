import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <label className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? 'Buscá productos, soluciones o servicios'}
        className="h-11 w-full rounded-full border border-border bg-white pl-11 pr-4 text-sm outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
      />
    </label>
  );
}
