import { Search } from 'lucide-react';
import { Input } from './Input';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function SearchBar({ onSearch, placeholder = 'Search...', className, debounceMs = 500 }: SearchBarProps) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, debounceMs);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-9 pr-4"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
