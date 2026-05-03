interface Props {
  open: boolean;
  onClose: () => void;
}

export function AboutDialog({ open, onClose }: Props) {
  return (
    <>
      <div
        data-testid="overlay"
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div
        role="dialog"
        aria-label="About caseIt"
        aria-hidden={!open}
        className={`fixed left-1/2 -translate-x-1/2 w-[440px] max-w-[92vw] bg-[#2c333d] text-white p-8 rounded-md shadow-2xl z-50 transition-all duration-300 ${
          open ? 'top-24 opacity-100' : '-top-[400px] opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-3 text-white/60 hover:text-white text-2xl leading-none focus:outline-none"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-3 tracking-tight">caseIt</h2>

        <p className="text-base leading-relaxed text-white/85 mb-6">
          A keyboard-first tool for converting text between
          UPPER, lower, Pascal and camel cases.
        </p>

        <a
          href="https://github.com/odedw/case-it"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[15px] font-medium text-white bg-[#1abc9c] hover:bg-[#48c9b0] px-4 py-2 rounded transition-colors no-underline"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          View on GitHub
        </a>

        <p className="text-sm text-white/55 mt-6">
          Made by Oded · MIT License
        </p>
      </div>
    </>
  );
}
