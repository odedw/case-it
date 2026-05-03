import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { AboutDialog } from './components/AboutDialog';
import { CopyToast } from './components/CopyToast';
import { applyCase, type CaseType } from './lib/caseUtils';
import { useShortcuts, detectMetaKeyName } from './lib/useShortcuts';

export default function App() {
  const [text, setText] = useState('');
  const [keepSpaces, setKeepSpaces] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const metaKeyName = useMemo(() => detectMetaKeyName(), []);

  const handleTransform = (caseType: CaseType) => {
    setText((current) => applyCase(current, caseType, keepSpaces));
  };

  useShortcuts({
    textareaRef,
    onTransform: handleTransform,
    enabled: !aboutOpen,
  });

  // Show toast on copy from textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const handleCopy = () => {
      setToastVisible(true);
      window.setTimeout(() => setToastVisible(false), 1200);
    };
    ta.addEventListener('copy', handleCopy);
    return () => ta.removeEventListener('copy', handleCopy);
  }, []);

  // Esc closes About
  useEffect(() => {
    if (!aboutOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAboutOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [aboutOpen]);

  return (
    <div className="min-h-screen bg-[#E9E9E9] font-[Oxygen,sans-serif] text-[#232323] flex flex-col">
      <Header onAboutClick={() => setAboutOpen(true)} />
      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 sm:px-8 mt-8 sm:mt-16 relative">
        <CopyToast visible={toastVisible} />
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-[7%] h-auto sm:h-[492px]">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            aria-label="Text to transform"
            className="w-full sm:w-[70%] h-64 sm:h-full p-3 border border-gray-300 rounded-none resize-none bg-white focus:outline-none focus:border-[#1abc9c] font-[Oxygen,sans-serif] text-base"
          />
          <div className="w-full sm:w-[23%]">
            <Controls
              keepSpaces={keepSpaces}
              onKeepSpacesChange={setKeepSpaces}
              onTransform={handleTransform}
              metaKeyName={metaKeyName}
            />
          </div>
        </div>
      </main>
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
