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
        className={`fixed left-1/2 -translate-x-1/2 w-[480px] max-w-[95vw] bg-[#65707E] text-white p-8 z-50 transition-all duration-300 ${
          open ? 'top-24 opacity-100' : '-top-[400px] opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-3 text-white/80 hover:text-white text-2xl leading-none focus:outline-none"
        >
          &times;
        </button>
        <p className="mb-6">
          <span className="block font-bold text-[19px] mb-2">caseIt Is</span>
          <span className="block ml-2">A simple web tool for text transformations,</span>
          <span className="block ml-2">designed to work with keyboard shortcuts.</span>
        </p>
        <p className="mb-6">
          <span className="block font-bold text-[19px] mb-2">caseIt Was Created</span>
          <span className="block ml-2">
            By me, Oded Welgreen, a{' '}
            <a
              href="https://github.com/OdedW"
              target="_blank"
              rel="noreferrer"
              className="text-[#62C0FF] hover:text-[#54A5DB] no-underline"
            >
              developer
            </a>{' '}
            and a musician.
          </span>
        </p>
        <p>
          <span className="block font-bold text-[19px] mb-2">If You Have</span>
          <span className="block ml-2">
            Any suggestions, case transformations or bugs{' '}
            <a
              href="mailto:caseIt@outlook.com"
              className="text-[#62C0FF] hover:text-[#54A5DB] no-underline"
            >
              let me know
            </a>
            .
          </span>
        </p>
      </div>
    </>
  );
}
