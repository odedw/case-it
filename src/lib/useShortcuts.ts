import { useEffect, RefObject } from 'react';
import type { CaseType } from './caseUtils';

const altKeyToCase: Record<string, CaseType> = {
  '1': 'upper',
  '2': 'lower',
  '3': 'pascal',
  '4': 'camel',
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
      // Alt+1..4 → transform
      if (e.altKey && altKeyToCase[e.key]) {
        e.preventDefault();
        onTransform(altKeyToCase[e.key]);
        return;
      }

      const meta = e.metaKey || e.ctrlKey;
      if (!meta) return;

      const target = e.target as HTMLElement | null;
      const isInTextarea = target === textareaRef.current;

      // Cmd/Ctrl+V or Cmd/Ctrl+C anywhere on the page → focus the textarea
      // and select its content so the browser's native paste/copy works on it.
      if ((e.key === 'v' || e.key === 'V' || e.key === 'c' || e.key === 'C') && !isInTextarea) {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.focus();
        if (e.key === 'c' || e.key === 'C') {
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
