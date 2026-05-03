import { useEffect, RefObject } from 'react';
import type { CaseType } from './caseUtils';

// Use e.code (physical key) rather than e.key — on Mac, Option+1 produces "¡",
// Option+2 produces "™", etc., so e.key is unreliable for Alt combos.
const altCodeToCase: Record<string, CaseType> = {
  Digit1: 'upper',
  Digit2: 'lower',
  Digit3: 'pascal',
  Digit4: 'camel',
};

interface Options {
  textareaRef: RefObject<HTMLTextAreaElement>;
  onTransform: (caseType: CaseType) => void;
  enabled: boolean;
}

export function useShortcuts({ textareaRef, onTransform, enabled }: Options) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt/Option + 1..4 → transform
      if (e.altKey && altCodeToCase[e.code]) {
        e.preventDefault();
        onTransform(altCodeToCase[e.code]);
        return;
      }

      const meta = e.metaKey || e.ctrlKey;
      if (!meta) return;

      const target = e.target as HTMLElement | null;
      const isInTextarea = target === textareaRef.current;

      // Cmd/Ctrl+V or Cmd/Ctrl+C anywhere on the page → focus the textarea
      // and select its content so the browser's native paste/copy works on it.
      if ((e.code === 'KeyV' || e.code === 'KeyC') && !isInTextarea) {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.focus();
        if (e.code === 'KeyC') {
          ta.select();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [textareaRef, onTransform, enabled]);
}

export function detectMetaKeyName(): string {
  if (typeof navigator === 'undefined') return 'Ctrl';
  const platform = (navigator.platform || '').toLowerCase();
  const ua = (navigator.userAgent || '').toLowerCase();
  return platform.includes('mac') || ua.includes('mac') ? 'Cmd' : 'Ctrl';
}
