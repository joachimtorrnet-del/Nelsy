import DOMPurify from 'dompurify';
import { useState } from 'react';

export function sanitize(value: string): string {
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

export function useSanitizedInput(initial = '') {
  const [value, setValue] = useState(initial);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValue(sanitize(e.target.value));
  };

  return { value, onChange, setValue };
}
