import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim() && window.location.pathname !== '/products') {
      navigate('/products');
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-4 h-4" />
      <Input
        type="text"
        placeholder="Search for printables..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 bg-white/50 border-pink-200/50 focus:border-pink-400 focus:ring-pink-400/20 backdrop-blur-sm"
      />
    </div>
  );
}