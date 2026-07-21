import { useState } from 'react';

export default function useObjectSearch() {
  const [query, setQuery] = useState('');
  return { query, setQuery };
}
