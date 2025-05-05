import { useState } from 'react';

export default function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard API not available');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Reset after timeout
      setTimeout(() => {
        setCopied(false);
      }, timeout);
      
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      setCopied(false);
      return false;
    }
  };

  return { copied, copy };
}